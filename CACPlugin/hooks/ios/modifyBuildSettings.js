'use strict';

const xcode = require('xcode'),
      utils = require('./utils'),
      fs = require('fs'),
      path = require('path');

module.exports = function(context) {
    var logger;
    console.log('Running hook => modifyBuildSettings.js');

    utils.returnIfNotIOSPlatform();

    function fingerPrintForFIPS140() {
        var groupName = "Fingerprint for FIPS 140";
        var options = {shellPath: '/bin/sh', shellScript: '"$PROJECT_DIR"/Tools/incore_macho -exe "$CONFIGURATION_BUILD_DIR/$EXECUTABLE_PATH"'};

        project.addBuildPhase([], 'PBXShellScriptBuildPhase', groupName, project.getFirstTarget().uuid, options);
    }

    function modifyFrameworkSearchPaths() {
        var pbxFileRelease = {
            path:'${PROJECT_DIR}/PKardSDK/Framework/Release',
            dirname: '${PROJECT_DIR}/PKardSDK/Framework/Release',
            customFramework: true
        }

        var pbxFileDebug = {
            path:'${PROJECT_DIR}/PKardSDK/Framework/Debug',
            dirname: '${PROJECT_DIR}/PKardSDK/Framework/Debug',
            customFramework: true
        }


        project.addToFrameworkSearchPaths(pbxFileRelease);
        project.addToFrameworkSearchPaths(pbxFileDebug);
    }

    function modifyOtherLinkerFlags(flag) {
        project.addToOtherLinkerFlags(flag);
    }

    function addSourceFile(sourceFile) {
        // // files, dirs to copy
        project.addSourceFile(sourceFile);
    }

    function modifyBuildXCConfig(keyValues, buildType) {
        var platformDir = 'platforms/ios/cordova';

        var commit = function(fileNamePath) {
            if(fileNamePath){
                var fileContents = fs.readFileSync(fileNamePath, 'utf-8');
                keyValues.forEach(function (keyValue, index) {
                    fileContents += "\n" +keyValue;
                });
                fs.writeFileSync(fileNamePath, fileContents, 'utf-8');
            }
        };

        switch(buildType){
            case "debug":
                var fileNamePath = path.join(platformDir, 'build-debug.xcconfig');
                commit(fileNamePath);
                break;
            case "release":
                var fileNamePath = path.join(platformDir, 'build-release.xcconfig');
                commit(fileNamePath);
                break;
            default:
                var fileNamePath = path.join(platformDir, 'build.xcconfig');
                commit(fileNamePath);
        }
    }

    var xcodeProjPath = utils.getFullProjectNamePath('platforms/ios','.xcodeproj');
    var projectPath = path.join(xcodeProjPath, 'project.pbxproj');
    var project = xcode.project(projectPath);
    project.parseSync();

    modifyBuildXCConfig(['OTHER_LDFLAGS = -ObjC -framework PKardSDK']);
    modifyBuildXCConfig(['DEVELOPMENT_TEAM = ZH933U85GQ', 'CODE_SIGN_IDENTITY = iPhone Developer: John Tsinonis (H28MUZBE9Q)'], 'debug');
    modifyBuildXCConfig(['DEVELOPMENT_TEAM = ZH933U85GQ', 'CODE_SIGN_IDENTITY = iPhone Distribution: John Tsinonis (ZH933U85GQ)'], 'release');
    fingerPrintForFIPS140();
    modifyFrameworkSearchPaths();
    modifyOtherLinkerFlags('"-framework PKardSDK"');
    addSourceFile('../../fips_premain.c');

    fs.writeFileSync(projectPath, project.writeSync());
    //console.log(groupName + ' in ' + context.opts.plugin.id);
}
