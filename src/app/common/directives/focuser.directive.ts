import {Directive, Renderer, ElementRef, Inject} from '@angular/core';
import {Platform} from 'ionic-angular';
import {LoggerService} from "../../services/logger/logger-service";
import {UtilService} from "../../common/services/util.service";

@Directive({
    selector: '[focuser]' // Attribute selector
})
export class Focuser {
    private static myElem: HTMLInputElement; //private static myElem: TextInput;
    private static myRenderer: Renderer;
    private static myLog: LoggerService;

    constructor(private renderer: Renderer,
                @Inject(ElementRef) private elementRef: ElementRef,
                private platform: Platform,
                private log: LoggerService,
                private utilService: UtilService) {
        Focuser.myRenderer = renderer;
        Focuser.myLog = log;
    }

    ngAfterViewInit() {
        //this.log.debug('top of Focuser ngAfterViewInit');

        // snag the element to focus as we arrive
        this.platform.ready()
            .then(() => {
                let element = this.elementRef.nativeElement.querySelector('input');

                setTimeout(() => {
                    Focuser.myElem = element;
                    //Focuser.refocus(); // NOTE: fires twice (once by caller)
                }, 300); // increased timeout from 150ms, seemed too short
            })
            .catch((error) => {
                let message = `Error => ${error}`;
                this.log.error(message);
            });
    }

    public static refocus(): void {
        if (Focuser.myElem) {
            if (Focuser.myElem.value) {
                let len: number = Focuser.myElem.value.length;
                Focuser.myElem.setSelectionRange(0, len);
            }
            //Focuser.myLog.debug('Value = (' + Focuser.myElem.value + ',' + Focuser.myElem.value.length + ')');
        }
        else {
            Focuser.myLog.error('No Focuser.element found');
        }

        if (Focuser.myElem && Focuser.myRenderer) {
            // NOTE: Initially this didn't work, but now it does, another working alternate is to use @ViewChild value passed in from input-text.component and use field.setFocus()
            Focuser.myRenderer.invokeElementMethod(Focuser.myElem, 'focus', []);
        }
        else {
            Focuser.myLog.error('No Focuser.Renderer found');
        }
    }

    // NOTE: using the renderer approach does not work, as the DOM value was not honoring the two-way data bind
    // public static setText(text: string) {
    //     Focuser.myElem.value = text; // NOTE: This approach kinda worked, however did not honor the two-data bind, that is the screen showed proper value, but DOM did not see this new value
    //     //Focuser.myRenderer.setElementAttribute(Focuser.myElem, "value", text); // NOTE: Doesn't work, but above statement does. hmmm
    //     Focuser.refocus();
    // }

}
