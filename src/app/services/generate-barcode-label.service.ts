import {Injectable} from '@angular/core';
import {LoggerService} from "./logger/logger-service";
import {Level as LoggerLevel, Level} from "../services/logger/level";

@Injectable()
export class GenerateBarcodeLabelService {
    static BARCODE_SYMBOL: string = "//";
    static CRLF = '\r\n';

    // Intermec constants
    static STX = "<STX>";
    static ETX = "<ETX>";
    static HAS_DATAMATRIX = "[)>";
    static INTERMEC_HEADER = "<STX><ESC>C<ETX><STX><ESC>P;E3;F3;<ETX>" + GenerateBarcodeLabelService.CRLF;
    static INTERMEC_FOOTER = "<STX>R<ETX><STX><ESC>E3<ETX><STX><CAN><ETX><STX><ETB><ETX>" + GenerateBarcodeLabelService.CRLF;

    // Zebra constants
    static ZEBRA_HEADER =
        "! 0 200 200 374 1" + GenerateBarcodeLabelService.CRLF + // label width
        "LABEL" + GenerateBarcodeLabelService.CRLF +             // media type
        "CONTRAST 0" + GenerateBarcodeLabelService.CRLF +        // print contrast
        "TONE 0" + GenerateBarcodeLabelService.CRLF +            // tone setting
        "SPEED 3" + GenerateBarcodeLabelService.CRLF +           // print speed
        "IN-DOTS" + GenerateBarcodeLabelService.CRLF +           // print units
        "BARCODE-TEXT OFF" + GenerateBarcodeLabelService.CRLF +  // insure we don't print barcode text below barcode
        "SETFF 10 10" + GenerateBarcodeLabelService.CRLF +       // Start the form out correctly
        "PAGE-WIDTH 400" + GenerateBarcodeLabelService.CRLF;     // page pixel width
    static ZEBRA_FOOTER =
        "FORM" + GenerateBarcodeLabelService.CRLF +              // page advance
        "PRINT" + GenerateBarcodeLabelService.CRLF;              // print the page
    static ZEBRA_TEXT_TAG = "TEXT 7 0";               // NOTICE NO trailing space
    static ZEBRA_BARCODE_TAG = "BARCODE 128 1 0 41";  // NOTICE NO trailing space
    static ZEBRA_DATAMATRIX_TAG = "TEXT 7 0";         // NOTICE NO trailing space - FYI: DataMatrix NOT SUPPORTED

    // ltrim function - Left trim whitespace
    public static ltrim(str) {
        return str.replace(/^\s+/, '');
    };

    // rtrim function - Right trim whitespace
    public static rtrim(str) {
        return str.replace(/\s+$/, '');
    };

    public static makeBarcodeLabel(log: LoggerService, device: any, qty: number, labelContent: Array<string>): string {
        let labels = "";
        let isZebra: boolean = false;

        if (device && device.name) {
            if (device.name.toLowerCase().indexOf("zebra".toLowerCase()) >= 0) {
                isZebra = true;
            }
        }

        // account for quantity of labels
        for (let jnx = 0; jnx < qty; jnx++) {
            // create each label based on the labelContent (need to determine printer type)
            if (isZebra) {
                labels += GenerateBarcodeLabelService.makeZebraLabel(log, labelContent);
            }
            else {
                labels += GenerateBarcodeLabelService.makeIntermecLabel(log, labelContent);
            }
        }

        GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, 'Labels returned (' + labels + ')');
        //alert('mec...' +labels);

        return labels;
    }

    // make Zebra label
    private static makeZebraLabel(log: LoggerService, labelContent: Array<string>) {
        let a_label = "";

        let label_line_raw = ""; // the raw unformatted text on a label line
        let label_line_fmt = ""; // a formatted label line

        let is_DATAMATRIX_label: boolean = false; // for the whole label
        let H_OR_B = 'B'; // 'H'uman or 'B'arcode reabable

        let mess = "";

        // Zebra specific variables
        let x_start_zebra: number = 20;
        let y_start_zebra: number = 10;
        let y_increment_zebra: number = 23;

        a_label = ""; //clear the label buffer

        // load the header
        a_label += GenerateBarcodeLabelService.ZEBRA_HEADER;

        // audit the header
        mess = "Printer make: Zebra";
        GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, mess);

        // loop thru the messagingDataModel, trimming
        for (let inx = 0; inx < labelContent.length; inx++) {
            // trim TRAILING spaces, NOT LEADING spaces
            labelContent[inx] = GenerateBarcodeLabelService.rtrim(labelContent[inx]); //RIGHT TRIM - note we are NOT trimming LEFT!

            if ((labelContent[inx] != null) && (labelContent[inx].length > 0)) {
                // check to see if we have an DATAMATRIX barcode, if so then our font will change
                // reduced DataMatrix CRUD
                if (labelContent[inx].indexOf(GenerateBarcodeLabelService.HAS_DATAMATRIX) > 0) {
                    is_DATAMATRIX_label = true;
                }
            }
        }

        // loop thru the messagingDataModel and create the label
        for (let inx = 0; inx < labelContent.length; inx++) {
            // we have messagingDataModel after 7th row? if so then we are a WIDE label, not NARROW
            if (inx >= 7) {
                // NOTE: WE SHOULD NEVER GET WIDE LABELS from handheld!
                mess ='Too many lines fed to label generator, 7 is the max, skipping extra lines';
                GenerateBarcodeLabelService.myLogger(log, Level.ERROR, mess);
                //alert(mess);
                break;
            }

            // clear the old formatted line first
            label_line_fmt = "";

            // trim TRAILING spaces, NOT LEADING spaces
            label_line_raw = GenerateBarcodeLabelService.rtrim(labelContent[inx]);

            if ((label_line_raw != null) && (label_line_raw.length > 0)) {
                // clear the old variables first
                H_OR_B = 'H'; // Assume 'H'uman readable

                // Label type specific values (YES DATAMATRIX is FIRST because it IS NARROW)
                // These may be overridden for a particular LINE
                if (is_DATAMATRIX_label) {
                    // DON'T truncate raw if we have the 2D barcode line itself
                    // reduced DataMatrix CRUD
                    if (label_line_raw.indexOf(GenerateBarcodeLabelService.HAS_DATAMATRIX) > 0) {
                        // check length
                        if (label_line_raw.length > 26) {
                            label_line_raw = GenerateBarcodeLabelService.rtrim(label_line_raw.substring(0, 26)); // NOTE: Must truncate to 26 (will display wierd)
                        }
                    }
                }

                // Barcode?
                if ((label_line_raw.length > 1) && (label_line_raw.startsWith(GenerateBarcodeLabelService.BARCODE_SYMBOL))) {
                    H_OR_B = 'B';
                    label_line_raw = label_line_raw.substring(2); // NOTE: Need to trim off the special char
                }

                // DataMatrix Barcode?
                // reduced DataMatrix CRUD
                if (label_line_raw.indexOf(GenerateBarcodeLabelService.HAS_DATAMATRIX) > 0) {
                    H_OR_B = 'B';

                    // Intermec does not handle printing of IUID labels very well, so cleanse the output by stripping the "[)>0625S"
                    label_line_raw = label_line_raw.replace("[)>0625S", "");
                }

                // ZEBRA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // DATA MATRIX? // NOTICE: we check this first, because the has H_OR_B = 'B' as well
                // reduced DataMatrix CRUD
                if (label_line_raw.indexOf(GenerateBarcodeLabelService.HAS_DATAMATRIX) > 0) {
                    label_line_fmt = label_line_fmt + GenerateBarcodeLabelService.ZEBRA_DATAMATRIX_TAG + " " + x_start_zebra + " " +
                        y_start_zebra + " " + "DataMatrix - NOT SUPPORTED" + GenerateBarcodeLabelService.CRLF; // mec... bobo... BUG: not supporting Data Matrix yet - print using QRCode?

                }

                // BARCODE? // notice we check the H_OR_B flag set above (H = Human, B = Barcode)
                else if (H_OR_B == 'B') {
                    label_line_fmt = label_line_fmt + GenerateBarcodeLabelService.ZEBRA_BARCODE_TAG + " " + x_start_zebra + " " +
                        y_start_zebra + " " + label_line_raw + GenerateBarcodeLabelService.CRLF;
                    // Extra advance
                    y_start_zebra = y_start_zebra + y_increment_zebra;

                }

                // TEXT?
                else {
                    // Added check for long lines in zebra
                    if (label_line_raw.length > 26) {
                        label_line_raw = GenerateBarcodeLabelService.rtrim(label_line_raw.substring(0, 26));
                    }

                    label_line_fmt = label_line_fmt + GenerateBarcodeLabelService.ZEBRA_TEXT_TAG + " " + x_start_zebra + " " + y_start_zebra + " " +
                        label_line_raw + GenerateBarcodeLabelService.CRLF;
                }

                // increment the Y position
                y_start_zebra = y_start_zebra + y_increment_zebra;

                // write an audit row?
                mess = label_line_fmt;
                GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, mess);
            }

            // append the current line to the existing label - even if we have NOTHING, then NOTHING will be added
            a_label = (a_label + label_line_fmt); // Right TRIM? // no trim for Zebra??? CRLF was lopped off???
        }

        // add the footer
        a_label = (a_label + GenerateBarcodeLabelService.ZEBRA_FOOTER);

        // audit the footer
        mess = GenerateBarcodeLabelService.ZEBRA_FOOTER;
        GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, mess);

        // audit label
        mess = "LABEL to (ZEBRA) [" + a_label + "]";
        GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, mess);

        return a_label;
    }

    // make Intermec label
    private static makeIntermecLabel(log: LoggerService, labelContent: Array<string>) {
        let a_label = "";

        let label_line_raw = ""; // the raw unformatted text on a label line
        let label_line_fmt = ""; // a formatted label line

        let is_DATAMATRIX_label: boolean = false; // for the whole label
        let H_OR_B = 'B'; // 'H'uman or 'B'arcode reabable
        let x_start: number = 2;
        let y_start: number = 360;
        let x_increment: number = 24;
        let x_advance: number = 0; // extra advance amount after a barcode (they are double height)
        let c_font: number = 20;
        let height: number = 1;
        let width: number = 1;
        let restore_save: boolean = false; // needed for IUID barcodes (we place barcode in specified location
        let x_start_save: number = 0;
        let y_start_save: number = 0;

        let mess = "";

        a_label = ""; //clear the label buffer

        // load the header
        a_label += GenerateBarcodeLabelService.INTERMEC_HEADER;

        // audit the header
        mess = "Printer make: Intermec";
        GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, mess);

        // loop thru the messagingDataModel, trimming
        for (let inx = 0; inx < labelContent.length; inx++) {
            // trim TRAILING spaces, NOT LEADING spaces
            labelContent[inx] = GenerateBarcodeLabelService.rtrim(labelContent[inx]); //RIGHT TRIM - note we are NOT trimming LEFT!

            if ((labelContent[inx] != null) && (labelContent[inx].length > 0)) {
                // check to see if we have an DATAMATRIX barcode, if so then our font will change
                // reduced DataMatrix CRUD
                if (labelContent[inx].indexOf(GenerateBarcodeLabelService.HAS_DATAMATRIX) > 0) {
                    is_DATAMATRIX_label = true;
                }
            }
        }

        // move the start point for DATAMATRIX down a little
        if (is_DATAMATRIX_label) {
            x_start = 2 + 10; // NOTE: may need fine tune (the label text is smaller so move it down a tad)
        }

        // loop thru the messagingDataModel and create the label
        for (let inx = 0; inx < labelContent.length; inx++) {
            // we have messagingDataModel after 7th row? if so then we are a WIDE label, not NARROW
            if (inx >= 7) {
                // NOTE: WE SHOULD NEVER GET WIDE LABELS from handheld!
                mess ='Too many lines fed to label generator, 7 is the max, skipping extra lines';
                GenerateBarcodeLabelService.myLogger(log, Level.ERROR, mess);
                //alert(mess);
                break;
            }

            // clear the old formatted line first
            label_line_fmt = "";

            // trim TRAILING spaces, NOT LEADING spaces
            label_line_raw = GenerateBarcodeLabelService.rtrim(labelContent[inx]);

            if ((label_line_raw != null) && (label_line_raw.length > 0)) {
                // clear the old variables first
                H_OR_B = 'H'; // Assume 'H'uman readable
                c_font = 20; // assume NARROW
                height = 1; // assume NARROW
                width = 1; // assume NARROW
                x_advance = 0; // assume NO advance yet

                // Label type specific values (YES DATAMATRIX is FIRST because it IS NARROW)
                // These may be overridden for a particular LINE
                if (is_DATAMATRIX_label) {
                    c_font = 30;
                    x_increment = 27; // NOTE: may need fine tune (the DATAMATRIX BARCODE POSITION IS FIXED)
                    // DON'T truncate raw if we have the 2D barcode line itself
                    // reduced DataMatrix CRUD
                    if (label_line_raw.indexOf(GenerateBarcodeLabelService.HAS_DATAMATRIX) > 0) {
                        // check length
                        if (label_line_raw.length > 26) {
                            label_line_raw = GenerateBarcodeLabelService.rtrim(label_line_raw.substring(0, 26)); // NOTE: Must truncate to 26 (will display wierd)
                        }
                    }
                }

                // Barcode?
                if ((label_line_raw.length > 1) && (label_line_raw.startsWith(GenerateBarcodeLabelService.BARCODE_SYMBOL))) {
                    H_OR_B = 'B';
                    c_font = 6;
                    height = 40;
                    width = 2;
                    label_line_raw = label_line_raw.substring(2); // NOTE: Need to trim off the special char
                    x_advance = x_increment - 5; // We WILL need to advance ("after" barcode)
                    x_start = x_start + 5; // We NEED to advance a little "before" barcode
                }

                // DataMatrix Barcode?
                // reduced DataMatrix CRUD
                if (label_line_raw.indexOf(GenerateBarcodeLabelService.HAS_DATAMATRIX) > 0) {
                    H_OR_B = 'B';
                    c_font = 17;
                    height = 60;
                    width = 3;

                    // Now we need to save the x and y position to restore later
                    restore_save = true;
                    x_start_save = x_start;
                    y_start_save = y_start;
                    x_start = 2 + 20; // at the top + a bit  // NOTE: may need fine tune (the DATAMATRIX BARCODE POSITION IS FIXED)
                    y_start = 90; // was 110; // near the right side // NOTE: may need fine tune (the DATAMATRIX BARCODE POSITION IS FIXED)

                    // Intermec does not handle printing of IUID labels very well, so cleanse the output by stripping the "[)>0625S"
                    label_line_raw = label_line_raw.replace("[)>0625S", "");
                }

                // Intermec ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // Intermec does not support semicolons, so cleanse the output by replacing semicolons with commas
                label_line_raw = label_line_raw.replace(";", ",");

                // pre-truncate 'Human' readable text for 'narrow' labels before printer (incorrectly) does
                if (H_OR_B == 'H') {
                    label_line_raw = GenerateBarcodeLabelService.rtrim(label_line_raw);

                    // THIS WILL trim out double spaces and make the a single space??? TEST???
                    while (label_line_raw.length > 26) {
                        let v_pos = label_line_raw.lastIndexOf("  "); // TRAVERSE BACKWARD
                        if (v_pos >= 0) {
                            label_line_raw = label_line_raw.substring(0, v_pos) + label_line_raw.substring(v_pos + 1);
                        } else {
                            break;
                        }
                    }

                    if (label_line_raw.length > 26) {
                        label_line_raw = GenerateBarcodeLabelService.rtrim(label_line_raw.substring(0, 26));
                    }
                }

                label_line_fmt = GenerateBarcodeLabelService.STX; // <STX>
                label_line_fmt = label_line_fmt + H_OR_B + inx + ";"; // H or B
                label_line_fmt = label_line_fmt + "o" + x_start + "," + y_start + ";"; // ox,y
                label_line_fmt = label_line_fmt + "f1;"; // always use "f1"
                label_line_fmt = label_line_fmt + "c" + c_font + ";"; // font
                label_line_fmt = label_line_fmt + "h" + height + ";" + "w" + width + ";"; // height and width
                label_line_fmt = label_line_fmt + "d3,"; // always use "d3" with TEXT to follow
                label_line_fmt = label_line_fmt + label_line_raw + ";"; // the DATA
                label_line_fmt = label_line_fmt + GenerateBarcodeLabelService.ETX; // <ETX>
                label_line_fmt = label_line_fmt + GenerateBarcodeLabelService.CRLF; // append the Carriage Return / Line Feed

                // write an audit row?
                mess = label_line_fmt;
                GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, mess);

                // Now we need to restore the x and y position to restore later
                if (restore_save) {
                    restore_save = false;
                    x_start = x_start_save;
                    y_start = y_start_save;
                }
            }

            // append the current line to the existing label - even if we have NOTHING, then NOTHING will be added
            a_label = GenerateBarcodeLabelService.rtrim(a_label + label_line_fmt); // Right TRIM?

            // NEED to advance "X" (notice we do this LAST for the NEXT line to follow
            // NOTE we are setting the NEXT x_start position (including any advance)
            x_start = x_start + x_increment + x_advance;
        }

        // add the footer
        a_label = GenerateBarcodeLabelService.rtrim(a_label + GenerateBarcodeLabelService.INTERMEC_FOOTER);

        // audit the footer
        mess = GenerateBarcodeLabelService.INTERMEC_FOOTER;
        GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, mess);

        // audit label
        mess = "LABEL to (Intermec) [" + a_label + "]";
        GenerateBarcodeLabelService.myLogger(log, Level.DEBUG, mess);

        return a_label;
    }

    private static myLogger(log: LoggerService, level: LoggerLevel, message: string) {
        switch (level) {
            case Level.ERROR:
                log.error(message);
                break;
            case Level.WARN:
                log.warn(message);
                break;
            case Level.INFO:
                log.info(message);
                break;
            case Level.DEBUG:
                log.debug(message);
                break;
            case Level.LOG:
                log.log(message);
                break;
            case Level.OFF:
            default:
                break;
        }
        //alert('mec...' + message);
    }

}
