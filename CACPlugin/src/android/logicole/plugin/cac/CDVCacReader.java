package logicole.plugin.cac;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.AssetFileDescriptor;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Environment;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.cordova.LOG;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.thursby.pkard.conscrypt.KeyManagerImpl;
import com.thursby.pkard.sdk.PKTrustManager;
import com.thursby.pkard.sdk.PKTrustStore;
import com.thursby.pkard.sdk.PKardDeviceRootedException;
import com.thursby.pkard.sdk.PKardNotAvailableException;
import com.thursby.pkard.sdk.PKardSDK;
import com.thursby.pkard.sdk.PKardSDKFeatures;
import com.thursby.pkard.sdk.ReaderStatus;
import com.thursby.pkard.sdk.TokenStatus;
import com.thursby.pkard.sdk.tsspki.PKSignature;
import com.thursby.pkard.sdk.tsspki.PKSignatureException;
import com.thursby.pkard.sdk.tsspki.PKSignatureRecord;
import com.thursby.pkard.util.Log;
import com.thursby.pkard.util.MiscHelper;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.StreamCorruptedException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.GeneralSecurityException;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.UnrecoverableKeyException;
import java.security.cert.Certificate;
import java.security.cert.CertificateEncodingException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Iterator;

import javax.crypto.Cipher;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;

public class CDVCacReader extends CordovaPlugin implements PKardSDK.PKardSDKEvents {

    /* supports use of Android CA store if FIPS mode is OFF
       If FIPS mode is ON then this will internally use PKTrustStore for trust anchors */
    private static final int CONFIG_TRUST_METHOD_FACTORY_NULL_STORE = 0;

    /* supports static trust store with customized trust anchor set */
    private static final int CONFIG_TRUST_METHOD_FACTORY_PK_STORE = 1;

    /* supports dynamic trust store with user interaction */
    private static final int CONFIG_TRUST_METHOD_PK_DIRECT = 2;

    /* toggle this to one of the values above to experiment with different types of trust manager
       Please note: CONFIG_TRUST_METHOD_PK_DIRECT is recommended, especially for cases where a user may need to approve a certificate
     */
    int trustMethod = CONFIG_TRUST_METHOD_PK_DIRECT;

    private Context context;
    private Activity activity;
    private AutoCompleteTextView inputData;
    private TextView outputData;
    private Signature signature;
    private Cipher crypto;
    private String dataToSign;
    private byte[] mCipherText;
    private String mPlainText;
    private Certificate userCert;
    private PublicKey pubKey;
    private PrivateKey privKey;
    private PKardSDK pkardSDK;
    private KeyStore mKeyStore;
    private Integer mCryptMode;
    private static String mChosenAlias;
    private static PKSignature mIdentitySignature = null;
    private TrustManager[] mTrustManagers = null;
    private KeyManager[] mKeyManagers = null;
    private static final String LOG_TAG = "Logicole";
    private static final int TIMEOUT = 10 * 1000;
    private static final int MAX_ROUTE_CONNECTIONS = 10;
    private static final int MAX_CONNECTIONS = 20;
    private boolean bIsSecureContext = true;
    protected static final String SAVED_SIG_FILE = "stored.sig";

    private ArrayList<String> identities = new ArrayList<String>();
    private boolean pkardConnected;
    private boolean gettingIdentities = false;
    private boolean isReaderAttached = false;
    private boolean isCardInserted = false;
    private boolean previousReaderState = false;
    private boolean previousCardState = false;


    private CallbackContext readerCallbackContext;
    private CallbackContext cardCallbackContext;
    private CordovaInterface cordovaInterface;

    private StatusChangeReceiver mPKardReceiver = new StatusChangeReceiver();
    public class StatusChangeReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context c, Intent intent) {
            if (intent.getAction().equals(PKardSDK.ACTION_PKARD_READER_STATE)) {
                // grab the intent's extras and display reader name, etc as desired.
                int readerStatus = intent.getIntExtra(PKardSDK.EXTRA_READER_STATE, ReaderStatus.NoReader);
                if(readerStatus == ReaderStatus.Ready) {
                    isReaderAttached = true;
                } else {
                    isReaderAttached = false;
                }

                if(previousReaderState != isReaderAttached) {
                    isReaderAttached();
                }
                previousReaderState = isReaderAttached;
            } else if (intent.getAction().equals(PKardSDK.ACTION_PKARD_TOKEN_STATE)) {
                int tokenStatus = intent.getIntExtra(PKardSDK.EXTRA_TOKEN_STATE, TokenStatus.kTokenStateInvalid);
                if (tokenStatus == TokenStatus.kTokenStateReadyForUse) {
                    isCardInserted = true;
                } else {
                    isCardInserted = false;
                }

                if(previousCardState != isCardInserted) {
                    isCardInserted();
                }
                previousCardState = isCardInserted;

                handleTokenStateChange(intent);
            } else {
                Log.d(LOG_TAG, "received bogus intent, ignoring => " + intent.getAction());
            }
        }
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        LOG.d(LOG_TAG, "Starting => " + LOG_TAG);

        this.mCryptMode = Cipher.ENCRYPT_MODE;
        this.activity = cordova.getActivity();
        this.context = cordova.getActivity().getApplicationContext();
        this.cordovaInterface = cordova;

        // Initialize CAC Reader here
        ArrayList<PKardSDKFeatures> features = new ArrayList<PKardSDKFeatures>();
        features.add(PKardSDKFeatures.PKARD_SCARD);
        features.add(PKardSDKFeatures.PKARD_HTTPS);
        features.add(PKardSDKFeatures.PKARD_SCREENLOCK);
        features.add(PKardSDKFeatures.PKARD_ENTRUST_IDENTITYGUARD);
        // uncomment below to enable FIPS mode
        features.add(PKardSDKFeatures.PKARD_FIPS);

        try {
            pkardSDK = PKardSDK.getInstance(activity, features);

            if (pkardSDK == null) {
                Toast.makeText(context, "PKard Toolkit failed to start, please restart", Toast.LENGTH_SHORT).show();
            }

        } catch (PKardNotAvailableException e2) {
            Log.e(LOG_TAG, "Pkard Service not available");
        }

        try {
            // do some basic checks for root, disable FIPS 140-2 mode if root is detected
            PKardSDK.isDeviceRooted();
        } catch (PKardDeviceRootedException e) {
            Log.d(LOG_TAG, "Root access to device detected", e);
            Toast.makeText(context, "Root access to device detected, FIPS mode will be disabled", Toast.LENGTH_SHORT).show();
            bIsSecureContext = false;
        }
        if (pkardSDK != null) {
            pkardSDK.addEventListener(this);
            pkardSDK.setAutoScreenLock(true);
            try {
                mKeyStore = KeyStore.getInstance("PKardClient", pkardSDK.getProviderName());
                mKeyStore.load(null, null);

            } catch (KeyStoreException e) {
                e.printStackTrace();
            } catch (NoSuchProviderException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (CertificateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        LOG.d(LOG_TAG, "Action: " + action);


        String[] identities = pkardSDK.getIdentities(android.os.Process.myPid());
        Log.d(LOG_TAG, "identities => " + Arrays.toString(identities));

        if (action.equals("version")) {
            this.version(callbackContext);
            return true;
        } else if(action.equals("isReaderAttached")) {
            this.readerCallbackContext = callbackContext;

            this.isReaderAttached();
            return true;
        } else if(action.equals("isCardInserted")) {
            this.cardCallbackContext = callbackContext;

            this.isCardInserted();
            return true;
        } else if(action.equals("setFipsMode")) {
            this.setFipsMode(callbackContext, args);
            return true;
        } else if(action.equals("lockScreen")) {
            this.lockScreen(callbackContext);
            return true;
        } else if(action.equals("cacCheck")) {
            this.cacCheck(args);
            return true;
        } else if(action.equals("sendPost")) {
            String host = args.getString(0);
            String postData = args.getString(1);
            String headers = args.getString(2);
            this.sendPost(host, postData, headers, callbackContext);

            return true;
        } else if(action.equals("sendGet")) {
            String host = args.getString(0);
            String headers = args.getString(1);
            this.sendGet(host, headers, callbackContext);

            return true;
        }
        return false;
    }

    private void isReaderAttached() {
        LOG.d(LOG_TAG, "isReaderAttached: " + isReaderAttached);

        if(readerCallbackContext != null) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    PluginResult pluginResult = new PluginResult(Status.OK, isReaderAttached);
                    pluginResult.setKeepCallback(true);

                    readerCallbackContext.sendPluginResult(pluginResult);
                }
            });
        }
    }

    private void isCardInserted() {
        LOG.d(LOG_TAG, "isCardInserted: " + isCardInserted);

        if(cardCallbackContext != null) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    PluginResult pluginResult = new PluginResult(Status.OK, isCardInserted);
                    pluginResult.setKeepCallback(true);

                    cardCallbackContext.sendPluginResult(pluginResult);
                }
            });
        }
    }

    private void lockScreen(CallbackContext callbackContext) {
        LOG.d(LOG_TAG, "Lockscreen TBD");
    }

    private void setFipsMode(CallbackContext callbackContext, JSONArray args) {
        Boolean fipsArgument = false;
        try {
            fipsArgument = args.getBoolean(0);

            if(bIsSecureContext && fipsArgument) {
                pkardSDK.setFipsMode(1);
            } else {
                pkardSDK.setFipsMode(0);
            }

        } catch (JSONException e) {
            Log.e(LOG_TAG, e.getLocalizedMessage());
        }

        LOG.d(LOG_TAG, "setFipsMode: " + fipsArgument);
    }

    private void version(CallbackContext callbackContext) {
        String version = pkardSDK.getVersionNumber();

        if(version != null) {
            callbackContext.success(version);
        } else {
            callbackContext.error("No version set by Thursby PKard.");
        }
    }

    private void isReaderAttached2() {
        LOG.d(LOG_TAG, "isReaderAttached: " + isReaderAttached);

        if(readerCallbackContext != null) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    PluginResult pluginResult = new PluginResult(Status.OK, isReaderAttached);
                    pluginResult.setKeepCallback(true);

                    readerCallbackContext.sendPluginResult(pluginResult);
                }
            });
        }
    }

    private PublicKey getPublicKey(String alias) {

        Log.v(LOG_TAG, "inspecting alias: " + alias);
        PublicKey publickey = null;

        try {
            userCert = mKeyStore.getCertificate(alias);
            if (userCert != null) {
                publickey = userCert.getPublicKey();
            }

        } catch (KeyStoreException e) {
            Log.e(LOG_TAG, "Error: " + e.getMessage(), e);
        }
        return publickey;
    }

    private void sendGet(final String urlString, final String jsonHeaders, final CallbackContext callbackContext) {
        LOG.d(LOG_TAG, "sendGet: urlString => " + urlString );

        new ConnectServerTask(callbackContext) {

            @Override
            protected String doInBackground(Void... params) {
                HttpsURLConnection urlConnection = null;

                try {
                    SSLContext sslCtx = createSslContext(true);
                    URL toLoad = new URL(urlString);

                    // Using HttpsURLConnection client - okhttp client underneath
                    urlConnection = (HttpsURLConnection) toLoad.openConnection();
                    urlConnection.setRequestMethod("GET");
                    setHeaders(urlConnection, jsonHeaders);
                    //urlConnection.setDoInput(true);
                    urlConnection.setHostnameVerifier(hostnameVerifier);
                    //urlConnection.setUseCaches(false);
                    //urlConnection.setConnectTimeout(0);
                    //urlConnection.setReadTimeout(TIMEOUT);
                    urlConnection.setSSLSocketFactory(sslCtx.getSocketFactory());

                    if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
//                        PluginResult pluginResult = new PluginResult(Status.ERROR, urlConnection.getResponseMessage());
//                        callbackContext.sendPluginResult(pluginResult);
                        return null;
                    } else {
//                        Log.d(LOG_TAG, "CipherSuite: " + urlConnection.getCipherSuite());
//                        Log.d(LOG_TAG, "Content Type: " + urlConnection.getContentType());
//                        Log.d(LOG_TAG, "Content Length: " + urlConnection.getContentLength());
//                        String response = readLines(urlConnection.getInputStream(),
//                                urlConnection.getContentEncoding(), urlConnection.getContentType());

//                        BufferedReader in = new BufferedReader(new InputStreamReader(
//                                urlConnection.getInputStream()));
//                        String inputLine;
//                        StringBuffer responseBuffer = new StringBuffer();
//
//                        while ((inputLine = in.readLine()) != null) {
//                            responseBuffer.append(inputLine);
//                        }
//                        in.close();
                        String response = readLines(urlConnection.getInputStream(),
                                urlConnection.getContentEncoding(), urlConnection.getContentType());

                        Log.d(LOG_TAG, "CipherSuite: " + urlConnection.getCipherSuite());
                        Log.d(LOG_TAG, "Content Type: " + urlConnection.getContentType());
                        Log.d(LOG_TAG, "Content Length: " + urlConnection.getContentLength());
                        //Log.d(LOG_TAG, "responseBuffer = > " + responseBuffer.toString());

                        return response;
//                        PluginResult pluginResult = new PluginResult(Status.OK, response);
//                        callbackContext.sendPluginResult(pluginResult);
                    }
                } catch(Exception e) {
                    Log.e(LOG_TAG, "Error: " + e.getMessage(), e);
                    return null;
//                    PluginResult pluginResult = new PluginResult(Status.ERROR, e.getMessage());
//                    callbackContext.sendPluginResult(pluginResult);
                } finally {
                    if(urlConnection != null) {
                        urlConnection.disconnect();
                    }
                }

            }

        }.execute();
    }

    private void sendPost(final String urlString, final String postData, final String jsonHeaders, final CallbackContext callbackContext) {
        LOG.d(LOG_TAG, "sendPost: urlString => " + urlString );

        new ConnectServerTask(callbackContext) {

            @Override
            protected String doInBackground(Void... params) {
                HttpsURLConnection urlConnection = null;

                try {
                    SSLContext sslCtx = createSslContext(true);
                    URL toLoad = new URL(urlString);

                    // Using HttpsURLConnection client - okhttp client underneath
                    urlConnection = (HttpsURLConnection) toLoad.openConnection();
                    urlConnection.setRequestMethod("POST");
                    setHeaders(urlConnection, jsonHeaders);
                    //urlConnection.setDoInput(true);
                    urlConnection.setHostnameVerifier(hostnameVerifier);
                    //urlConnection.setUseCaches(false);
                    //urlConnection.setConnectTimeout(0);
                    //urlConnection.setReadTimeout(TIMEOUT);
                    urlConnection.setSSLSocketFactory(sslCtx.getSocketFactory());

                    // For POST only - START
                    if(postData != null && postData.length() > 0) {
                        Log.d(LOG_TAG, "Post Data => " + postData);
                        urlConnection.setDoOutput(true);
                        OutputStream outputStream = urlConnection.getOutputStream();

                        outputStream.write(postData.getBytes("UTF-8"));
                        outputStream.flush();
                        outputStream.close();
                    }
                    // For POST only - END



                    if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
//                        PluginResult pluginResult = new PluginResult(Status.ERROR, urlConnection.getResponseMessage());
//                        callbackContext.sendPluginResult(pluginResult);
                        return null;
                    } else {
//                        Log.d(LOG_TAG, "CipherSuite: " + urlConnection.getCipherSuite());
//                        Log.d(LOG_TAG, "Content Type: " + urlConnection.getContentType());
//                        Log.d(LOG_TAG, "Content Length: " + urlConnection.getContentLength());
//                        String response = readLines(urlConnection.getInputStream(),
//                                urlConnection.getContentEncoding(), urlConnection.getContentType());

//                        BufferedReader in = new BufferedReader(new InputStreamReader(
//                                urlConnection.getInputStream()));
//                        String inputLine;
//                        StringBuffer responseBuffer = new StringBuffer();
//
//                        while ((inputLine = in.readLine()) != null) {
//                            responseBuffer.append(inputLine);
//                        }
//                        in.close();
                        String response = readLines(urlConnection.getInputStream(),
                                urlConnection.getContentEncoding(), urlConnection.getContentType());

                        Log.d(LOG_TAG, "CipherSuite: " + urlConnection.getCipherSuite());
                        Log.d(LOG_TAG, "Content Type: " + urlConnection.getContentType());
                        Log.d(LOG_TAG, "Content Length: " + urlConnection.getContentLength());
                        //Log.d(LOG_TAG, "responseBuffer = > " + responseBuffer.toString());

                        return response;
//                        PluginResult pluginResult = new PluginResult(Status.OK, response);
//                        callbackContext.sendPluginResult(pluginResult);
                    }
                } catch(Exception e) {
                    Log.e(LOG_TAG, "Error: " + e.getMessage(), e);
                    return null;
//                    PluginResult pluginResult = new PluginResult(Status.ERROR, e.getMessage());
//                    callbackContext.sendPluginResult(pluginResult);
                } finally {
                    if(urlConnection != null) {
                        urlConnection.disconnect();
                    }
                }

            }
        }.execute();

    }

//    private void sendPost(final String urlString, final String postData, final String jsonHeaders, final CallbackContext callbackContext) {
//        LOG.d(LOG_TAG, "sendPost: urlString => " + urlString );
//
//        //mIdentitySignature.mAlias
//        LOG.d(LOG_TAG, "sendPost: Pub key => " + getPublicKey(mIdentitySignature.mAlias));
//
//        cordova.getThreadPool().execute(new Runnable() {
//            public void run() {
//                HttpsURLConnection urlConnection = null;
//
//                try {
//                    SSLContext sslCtx = createSslContext(true);
//                    URL toLoad = new URL(urlString);
//
//                    // Using HttpsURLConnection client - okhttp client underneath
//                    urlConnection = (HttpsURLConnection) toLoad.openConnection();
//                    urlConnection.setRequestMethod("POST");
//                    setHeaders(urlConnection, jsonHeaders);
//                    //urlConnection.setDoInput(true);
//                    urlConnection.setHostnameVerifier(hostnameVerifier);
//                    //urlConnection.setUseCaches(false);
//                    //urlConnection.setConnectTimeout(0);
//                    urlConnection.setReadTimeout(TIMEOUT);
//                    urlConnection.setSSLSocketFactory(sslCtx.getSocketFactory());
//
//                    // For POST only - START
//                    if(postData != null && postData.length() > 0) {
//                        Log.d(LOG_TAG, "Post Data => " + postData);
//                        urlConnection.setDoOutput(true);
//                        OutputStream outputStream = urlConnection.getOutputStream();
//
//                        outputStream.write(postData.getBytes("UTF-8"));
//                        outputStream.flush();
//                        outputStream.close();
//                    }
//                    // For POST only - END
//
//
//
//                    if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
//                        PluginResult pluginResult = new PluginResult(Status.ERROR, urlConnection.getResponseMessage());
//                        callbackContext.sendPluginResult(pluginResult);
//                    } else {
////                        Log.d(LOG_TAG, "CipherSuite: " + urlConnection.getCipherSuite());
////                        Log.d(LOG_TAG, "Content Type: " + urlConnection.getContentType());
////                        Log.d(LOG_TAG, "Content Length: " + urlConnection.getContentLength());
////                        String response = readLines(urlConnection.getInputStream(),
////                                urlConnection.getContentEncoding(), urlConnection.getContentType());
//
////                        BufferedReader in = new BufferedReader(new InputStreamReader(
////                                urlConnection.getInputStream()));
////                        String inputLine;
////                        StringBuffer responseBuffer = new StringBuffer();
////
////                        while ((inputLine = in.readLine()) != null) {
////                            responseBuffer.append(inputLine);
////                        }
////                        in.close();
//                        String response = readLines(urlConnection.getInputStream(),
//                                urlConnection.getContentEncoding(), urlConnection.getContentType());
//
//                        Log.d(LOG_TAG, "CipherSuite: " + urlConnection.getCipherSuite());
//                        Log.d(LOG_TAG, "Content Type: " + urlConnection.getContentType());
//                        Log.d(LOG_TAG, "Content Length: " + urlConnection.getContentLength());
//                        //Log.d(LOG_TAG, "responseBuffer = > " + responseBuffer.toString());
//
//
//                        PluginResult pluginResult = new PluginResult(Status.OK, response);
//                        callbackContext.sendPluginResult(pluginResult);
//                    }
//                } catch(Exception e) {
//                    Log.e(LOG_TAG, "Error: " + e.getMessage(), e);
//                    PluginResult pluginResult = new PluginResult(Status.ERROR, e.getMessage());
//                    callbackContext.sendPluginResult(pluginResult);
//                } finally {
//                    if(urlConnection != null) {
//                        urlConnection.disconnect();
//                    }
//                }
//            }
//        });
//
//    }

    private void cacCheck(JSONArray args) {
        try {
            String host = args.getString(0);
            okhttpConnect(host);
        } catch (JSONException e) {
            Log.e(LOG_TAG, e.getLocalizedMessage());
        }
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);

        // for auto-lock
        // if a sig is already saved, then we either just performed
        // a crypt at user's request (auto-lock is enabled) ~or~ the user manually saved the signature
        if (PKSignatureRecord.signatureRecorded()) {
            mIdentitySignature = PKSignatureRecord.getRecordedSignature();
            // and save it persistently to be read when the app relaunches
            FileOutputStream fos;
            try {
                fos = activity.openFileOutput(SAVED_SIG_FILE, Context.MODE_PRIVATE);
                ObjectOutputStream os = new ObjectOutputStream(fos);
                os.writeObject(mIdentitySignature);
                os.close();
            } catch (FileNotFoundException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        activity.unregisterReceiver(mPKardReceiver);
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);

        Log.d(LOG_TAG, "onResume()");

        prepareReceiver();
        if (mIdentitySignature == null) {
            FileInputStream fis;
            try {
                fis = activity.openFileInput(SAVED_SIG_FILE);
                ObjectInputStream is = new ObjectInputStream(fis);
                mIdentitySignature = (PKSignature) is.readObject();
            } catch (FileNotFoundException e) {
                Log.d(LOG_TAG, "signature not previously saved to file");
            } catch (StreamCorruptedException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
        if (mIdentitySignature != null) {
            Log.d(LOG_TAG, "restored signature from file");
            PKSignatureRecord.setSignature(mIdentitySignature);
            Log.d(LOG_TAG, "Alias Used: " + mIdentitySignature.mAlias);
        }
        //actionSpinner.setSelection(0); // prevent a signature from starting w/o user interaction

        handleIncoming(activity.getIntent());
    }

    public void onNewIntent(Intent intent) {
        handleIncoming(intent);
    }

    private void handleIncoming(Intent intent) {
        try {
            if(intent != null && intent.getAction().equals(Intent.ACTION_VIEW)) {
                Log.d(LOG_TAG, "received intent:" + intent.getAction());
                Uri externalUrl = intent.getData();
                Log.d(LOG_TAG, "intent data: " + externalUrl.toString());
                if (externalUrl != null){
                    if (externalUrl.getScheme().equals("content")){ // Handle .pkardmanagement files
                        ContentResolver cr = context.getContentResolver();
                        String mimeType = cr.getType(externalUrl);
                        AssetFileDescriptor afd = cr.openAssetFileDescriptor(externalUrl, "r");
                        afd.toString();
                        Log.d(LOG_TAG, "Got it!\nMimeType: " + mimeType + "\nUri: " + externalUrl.toString() + "\nAFD: " + afd.toString() + "\nReal Name: " + MiscHelper.getRealPathFromURI(context,externalUrl));
                        // TODO: This where we call the code to try and load the Policy File
                    }
                }
            }
        } catch (Exception e) {
            // if we were not opened via intent, then the intent data will be null
            // probably could be a little tidier about this flow...
            e.printStackTrace();
            Log.e(LOG_TAG, "not opened via intent");
        }
    }

    @Override
    public void onStop() {
        super.onStop();

        Log.d(LOG_TAG, "onStop()");
        pkardSDK.removeEventListener(this);
        CleanupAsync cleaner = new CleanupAsync();
        cleaner.execute();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        Log.d(LOG_TAG, "onDestroy()");
        Log.stop();
    }



    @Override
    public void onPKardConnected() {
        synchronized(this) {
            pkardConnected = true;
        }
        Log.d(LOG_TAG, "onPKardConnected()");
        if (!gettingIdentities && pkardConnected) {
            GetIdentitiesTask t = new GetIdentitiesTask();
            t.execute();
        }
    }

    @Override
    public void onPKardDisconnected() {
        synchronized(this) {
            pkardConnected = false;
        }
        Log.d(LOG_TAG, "onPKardDisconnected()");
        Toast.makeText(context, "PKard Disconnected", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onKeyStorageChanged(boolean added, String alias) {
        Log.d(LOG_TAG, "onKeyStorageChagned " + alias + ((added) == true ? " added":" removed"));

        if (!gettingIdentities && pkardConnected) {
            GetIdentitiesTask t = new GetIdentitiesTask();
            t.execute();
        }
    }

    private void handleTokenStateChange(Intent intent) {
        // may choose to dig out the extras for the token, but the list of token's
        // should be accurate. For now this will typically only contain 1 smart-card type token.
        // 4 = kTokenStateReadyForUse
        int tokenStatus = intent.getIntExtra(PKardSDK.EXTRA_TOKEN_STATE, TokenStatus.kTokenStateInvalid);
        if (tokenStatus == TokenStatus.kTokenStateReadyForUse
                || tokenStatus == TokenStatus.kTokenStateNotPresent) {
            Log.i(LOG_TAG, "Token changed: check updated identities");
            if (!gettingIdentities && pkardConnected) {
                //identitiesSpinner.setEnabled(false);
                GetIdentitiesTask t = new GetIdentitiesTask();
                t.execute();
            }
        } else {
            Log.i(LOG_TAG, "intermediate state change");
        }
    }



    /**
     * A task to fetch the list of available identities from PKard
     *
     * This will get the current list of object aliases
     * @author chris
     *
     */
    private class GetIdentitiesTask extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground (Void... arg0) {

            PrivateKey keyPriv = null;
            PublicKey keyPub = null;
            String alias;
            gettingIdentities = true;
            try {
                // just for debug purpose, print the entire cache
                String[] aliasList = pkardSDK.getObjectAliases(-1);
                if (aliasList != null) {
                    for (String a : aliasList)
                        Log.d(LOG_TAG, "found " + a);
                }

                // The PKClientKeystore is more convenient to access only
                // the keys & public certificates for a user
                // This will list aliases from multiple PKard sources,
                // including soft/derived certificates as well as hw tokens
                // like CAC/PIV, etc.
                Enumeration<String> aliases = mKeyStore.aliases();
                identities.clear();
                if (!aliases.hasMoreElements()) {
                    Log.d(LOG_TAG, "client key store has NO aliases");
                } else {
                    while (aliases.hasMoreElements()) {
                        alias = (String)aliases.nextElement();
                        identities.add(alias);
                    }
                }
            } catch (KeyStoreException e) {
                e.printStackTrace();
            } finally {
                if (keyPriv != null) {
                    privKey = keyPriv;
                }
                if (keyPub != null) {
                    pubKey = keyPub;
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void arg0) {
            //identitiesSpinner.setEnabled(true);
            //identitiesSpinner.setAdapter(identitiesAdapter);
            gettingIdentities = false;
        }
    }


    private class GetKeyForChosenAlias extends AsyncTask<String, Void, Void> {
        @Override
        protected Void doInBackground(String... alias) {
            Log.v(LOG_TAG, "inspecting alias: " + alias);
            gettingIdentities = true;
            try {
                if (mKeyStore.isKeyEntry(alias[0])) {
                    Log.i(LOG_TAG, "is a private key entry");
                    privKey = (PrivateKey) mKeyStore.getKey(alias[0], null);
                    if (privKey == null) return null;
                    userCert = mKeyStore.getCertificate(alias[0]);
                    if (userCert != null) {
                        pubKey = userCert.getPublicKey();
                    }
                }
            } catch (UnrecoverableKeyException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (KeyStoreException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return null;
        }
        @Override
        protected void onPostExecute(Void arg0) {
            //actionSpinner.setEnabled(true);
            //identitiesSpinner.setEnabled(true);
            X509Certificate x509 = (X509Certificate) userCert;
            outputData.append("Chose ");
            if (x509 != null) {
                outputData.append(x509.getSubjectDN().getName());
            }
            gettingIdentities = false;
        }
    }


    private File saveCertToFile(Certificate c, String alias) {
        Log.d(LOG_TAG, alias);
        String fName = alias + ".cer";
        try {
            Log.d(LOG_TAG, "writing out user cert " + fName);
            final FileOutputStream fos = new FileOutputStream(Environment.getExternalStorageDirectory().getPath() + "/" + fName);
            fos.write(c.getEncoded());
            fos.close();
            File f = new File(Environment.getExternalStorageDirectory().getPath(), fName);
            return f;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return null;
        } catch (CertificateEncodingException e) {
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private class UpdateStoredSignature extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground(Void... arg0) {
            try {
                mIdentitySignature = new PKSignature(mChosenAlias);
            } catch (PKSignatureException e) {
                Log.d(LOG_TAG, "unable to create and store signature record: " + e.getMessage());
            }
            return null;
        }
        @Override
        protected void onPostExecute(Void arg0) {
            AlertDialog.Builder builder = new AlertDialog.Builder(context);
            builder.setTitle("save signature for " + mChosenAlias);
            if (mIdentitySignature != null) {
                builder.setMessage("This will be used so secure your data within this app");
                builder.setPositiveButton("Save", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface arg0, int arg1) {
                        Log.d(LOG_TAG, "saved signature");
                        PKSignatureRecord.setSignature(mIdentitySignature);
                        // and save it persistently to be read when the app relaunches
                        FileOutputStream fos;
                        try {
                            fos = activity.openFileOutput(SAVED_SIG_FILE, Context.MODE_PRIVATE);
                            ObjectOutputStream os = new ObjectOutputStream(fos);
                            os.writeObject(mIdentitySignature);
                            os.close();
                        } catch (FileNotFoundException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        } catch (IOException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }
                });
            } else {
                builder.setMessage("Signature failed");
            }
            builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface arg0, int arg1) {
                    // nothing to do.
                }
            });
            builder.setCancelable(true);
            //builder.setIcon(R.drawable.pkard_reader_nobg_small);

            builder.create().show();
            //actionSpinner.setEnabled(true);
        }

    }

    private SSLContext createSslContext(boolean clientAuth)
            throws GeneralSecurityException {


        TrustManagerFactory factory = TrustManagerFactory.getInstance("X509");
        Log.d(LOG_TAG, "using TrustManagerFactory.getTrustManagers to find trust manager");

        if (trustMethod == CONFIG_TRUST_METHOD_FACTORY_NULL_STORE) {
            // should force use of Android built-in CA store.
            factory.init((KeyStore) null);
            mTrustManagers = factory.getTrustManagers();
        } else if (trustMethod == CONFIG_TRUST_METHOD_FACTORY_PK_STORE) {
            // should use the system default trust policy, using only the certs from the PKTrustStore
            PKTrustStore pkTrust = new PKTrustStore(context);
            pkTrust.init();
            KeyStore trustAnchors = pkTrust.buildKeyStore();
            factory.init(trustAnchors);
            mTrustManagers = factory.getTrustManagers();
        } else if (trustMethod == CONFIG_TRUST_METHOD_PK_DIRECT) {
            // directly instantiate the PKTrustManager, allowing user interaction
            // this is more in-line with what Sub Rosa or PKard Browser would use.
            // it offers CRL, OCSP, etc that CONFIG_TRUST_METHOD_FACTORY_PK_STORE may not use (depending on Android version?)
            PKTrustManager trustManager = new PKTrustManager(context, false);
            // call this for each activity if the activity context changes
            // otherwise, the dialog allowing users to approve new certificates will fall-back to a generic looking Notification
            trustManager.bindActivity(activity);
            mTrustManagers = new TrustManager[]{trustManager};
        }
        if (clientAuth) {
            try {
                KeyManagerFactory kmf = KeyManagerFactory.getInstance("X509");
                kmf.init(mKeyStore, null);
                mKeyManagers = kmf.getKeyManagers();
                for (KeyManager k : mKeyManagers) {
                    if (k instanceof KeyManagerImpl) {
                        KeyManagerImpl impl = (KeyManagerImpl) k;
                        impl.bindActivity(activity);
                    }
                }
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }

        SSLContext context = SSLContext.getInstance("TLS", pkardSDK.getProviderName());

        // at last, initialize this context with our trust and keys
        context.init(mKeyManagers, mTrustManagers, null);

        return context;
    }

    abstract private class ConnectServerTask extends AsyncTask<Void, Void, String> {
        private CallbackContext callbackContext;

        public ConnectServerTask(CallbackContext callbackContext) {
            this.callbackContext = callbackContext;
        }

//        @Override
//        protected String doInBackground(Void... params) {
//            return null;
//        }

        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);

            if(result != null) {
                Log.d(LOG_TAG, "ConnectServerTask results => " + result);

                PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
                //pluginResult.setKeepCallback(true);

                callbackContext.sendPluginResult(pluginResult);
            } else {
                Toast.makeText(context,
                        "Error: failed to connect", Toast.LENGTH_LONG)
                        .show();
            }
        }
    }

    abstract class GetHtmlTask extends AsyncTask<Void, Void, String> {
        Exception error;

//        @Override
//        protected void onPreExecute() {
//            outputData.setText("");
//        }

        @Override
        protected void onPostExecute(String result) {
            if(result != null) {
                Log.d(LOG_TAG, "GetHtmlTask return results => " + result);
            }
            else {
                Toast.makeText(context,
                        "Error: failed to connect", Toast.LENGTH_LONG)
                        .show();
            }
        }
    }



    // TODO:  remove and use real host name, since it's local dev and self signed, bypass
    HostnameVerifier hostnameVerifier = new HostnameVerifier() {
        @Override
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    };

    private void setHeaders(HttpsURLConnection urlConnection, String jsonHeaders) throws JSONException {
        JSONObject jsonObject = new JSONObject(jsonHeaders);
        for (Iterator<String> key = jsonObject.keys(); key.hasNext();) {
            String header = key.next();
            Log.d(LOG_TAG, "header => " + header + " value =>" + jsonObject.getString(header));
            urlConnection.setRequestProperty(header, jsonObject.getString(header));
        }
//        urlConnection.setRequestProperty("Content-Type", "application/json");
//        urlConnection.setRequestProperty("Authorization", "Basic dW5kZWZpbmVkOnBhc3N3b3Jk");
//        urlConnection.setRequestProperty("Accept", "application/json");
//        urlConnection.setRequestProperty("ClientId", "dmles");
    }


    private void okhttpConnect(final String urlString) {
        new GetHtmlTask() {
            @Override
            protected String doInBackground(Void... arg0) {
                try {

                    SSLContext sslCtx = createSslContext(true);
                    URL toLoad = new URL(urlString);

                    // TODO:  remove and use real host name, since it's local dev and self signed, bypass
                    HostnameVerifier hostnameVerifier = new HostnameVerifier() {
                        @Override
                        public boolean verify(String hostname, SSLSession session) {
                            return true;
                        }
                    };

                    /*
                     * Using HttpsURLConnection client - okhttp client underneath
                     */
                    HttpsURLConnection urlConnection = (HttpsURLConnection) toLoad.openConnection();
                    urlConnection.setHostnameVerifier(hostnameVerifier);
                    urlConnection.setUseCaches(false);
                    urlConnection.setDoInput(true);
                    //urlConnection.setDoOutput(true);
                    //urlConnection.setRequestProperty("Connection", "keep-alive");
                    urlConnection.setConnectTimeout(0);
                    urlConnection.setReadTimeout(TIMEOUT);
                    urlConnection.setRequestMethod("GET");
                    urlConnection
                            .setSSLSocketFactory(sslCtx.getSocketFactory());
                    try {
                        urlConnection.connect();

                        if (urlConnection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                            return urlConnection.getResponseMessage();
                        }

                        Log.d(LOG_TAG, "URL: " + urlString);
                        Log.d(LOG_TAG, "CipherSuite: " + urlConnection.getCipherSuite());
                        Log.d(LOG_TAG, "Content Type: " + urlConnection.getContentType());
                        Log.d(LOG_TAG, "Content Length: " + urlConnection.getContentLength());
                        return readLines(urlConnection.getInputStream(),
                                urlConnection.getContentEncoding(), urlConnection.getContentType());
                    } finally {
                        urlConnection.disconnect();
                    }
                } catch (Exception e) {
                    Log.d(LOG_TAG, "Error: " + e.getMessage(), e);

                    return null;
                }
            }
        }.execute();
    }

    private String readLines(InputStream in, String encoding, String contentType)
            throws IOException {
        Log.i(LOG_TAG, "connection content encoding: " + encoding);

        StringBuilder buff = new StringBuilder();
        BufferedReader reader = null;
        reader = new BufferedReader(new InputStreamReader(
                in, encoding != null ? encoding : "UTF-8"));

        try {
            String line = null;
            while ((line = reader.readLine()) != null) {
                buff.append(line);
            }

            return buff.toString();
        } finally {

            Log.v(LOG_TAG, buff.toString());
            in.close();
        }

    }


    private class DoSignatureTask extends AsyncTask<Void, Void, byte[]> {
        @Override
        protected byte[] doInBackground (Void... arg0) {
            String errorString = "";
            try {
                // prepare to sign, specifying the algorithm. Provider is optional, but explicit is preferred
                // alg name should be a supported hash function *withRSA,
                // or "NONEwithRSA" to do a raw signature with out hasing in the case where the input was already hashed
                signature = Signature.getInstance("SHA256withRSA", pkardSDK.getProviderName());
                signature.initSign(privKey);
            } catch (NoSuchAlgorithmException e) {
                errorString = "Failed to init, no algorithm SHA1withRSA";
                e.printStackTrace();
            } catch (NoSuchProviderException e) {
                errorString = "Failed to init, no provider named " + pkardSDK.getProviderName();
                e.printStackTrace();
            } catch (InvalidKeyException e) {
                errorString = "Failed to init, bad key";
                e.printStackTrace();
            }

            try {
                // add DTBS to the signature object
                signature.update(dataToSign.getBytes());
                // when all data is updated, do the signature
                byte[] realSig = signature.sign();
                return realSig;
            } catch (SignatureException e) {
                e.printStackTrace();
                // a big cheat to report the error message this way!!
                errorString = pkardSDK.peekLastError(-1); // transactionSerial is currently unused, thus -1
            }
            return errorString.getBytes();
        }

        @Override
        protected void onPostExecute(byte[] sigBytes) {
            outputData.setText("Using " + pkardSDK.getProviderName() + "\n\n");
            outputData.append("Results:\n" + signature.toString());
            try {
                // reset to verify
                //signature = null;
                //signature = Signature.getInstance("SHA256withRSA", pkard.getProviderName());
                // init the object for verifying a signature
                signature.initVerify(pubKey);
                // provide the data that was signed previously
                signature.update(dataToSign.getBytes());
                // after the data is provided, do the verify

                String outMessage = null;
                if (sigBytes != null && sigBytes.length > 0) {
                    if (signature.verify(sigBytes)) {
                        outputData.append("\n has been VERIFIED\n\n");
                    } else {
                        outputData.append("\n FAILED to verify\n\n");
                        //outMessage = MiscHelper.bytesToString(sigBytes, 0, sigBytes.length);
                        outputData.append("Last PKard error: " + new String(sigBytes) + "\n\n"); // in case of results in peekLastError.
                    }
                } else {
                    outMessage = "\n\nError: no signature";
                }
                if (outMessage != null)
                    outputData.append(outMessage);
            } catch (InvalidKeyException e) {
                e.printStackTrace();
            } catch (SignatureException e) {
                e.printStackTrace();
            }
//            if (! breakSignatureLoop) {
//                dataToSign = inputData.getText().toString();
//                DoSignatureTask signer = new DoSignatureTask();
//                signer.execute();
//            }
            //actionSpinner.setEnabled(true);
        }
    }

    private class CleanupAsync extends AsyncTask<Void, Void, Void> {
        @Override
        protected Void doInBackground(Void...voids) {

            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    PKardSDK.finishedWithInstance();
                }
            });

            return null;
        }
    }

    private void prepareReceiver () {
        IntentFilter filter = new IntentFilter();
        filter.addAction(PKardSDK.ACTION_PKARD_READER_STATE);
        filter.addAction(PKardSDK.ACTION_PKARD_TOKEN_STATE);
        activity.registerReceiver(mPKardReceiver, filter);
    }
}
