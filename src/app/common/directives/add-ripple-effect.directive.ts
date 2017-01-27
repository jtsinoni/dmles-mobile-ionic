import {Directive, ElementRef, Renderer} from "@angular/core";
import {LoggerService} from "../../services/logger/logger-service";

@Directive({
    selector: '[mb-add-ripple-effect]',
})
export class AddRippleEffectDirective {
    private nativeElement: HTMLElement;

    constructor(private elementRef: ElementRef,
                private renderer: Renderer,
                private log: LoggerService) {
        this.nativeElement = this.elementRef.nativeElement;
    }

    //wait for the component to render completely
    ngOnInit() {
        // Listen to click events in the component
        this.renderer.listen(this.nativeElement, 'click', (event) => {
            // Do something with 'event'
            this.log.debug(`Event => ${event} Parent => ${this.elementRef.nativeElement.parentElement}`);

            // // Remove Old Ripple elemen
            // let rippleElement = this.nativeElement.getElementsByClassName("ripple")[0];
            // if(rippleElement) {
            //     //this.log.debug(`Ripple => ${rippleElement} Parent => ${rippleElement.parentElement}`);
            //
            //     this.renderer.invokeElementMethod(this.nativeElement, 'removeChild', [rippleElement]);
            // }

            // let posX: number = this.nativeElement.offsetLeft;
            // let posY: number = this.nativeElement.offsetTop;
            //
            //
            // let elementWidth: number = this.nativeElement.offsetWidth
            // let elementHeight: number = this.nativeElement.offsetHeight;
            //
            // this.log.debug(`posX => ${posX}, posY => ${posX}, elementWidth => ${elementWidth}, elementHeight => ${elementHeight}`);

            // //Make it round!
            // if(elementWidth >= elementHeight) {
            //     elementHeight = elementWidth;
            // } else {
            //     elementWidth = elementHeight;
            // }
            //
            // this.log.debug(`posX => ${posX}, posY => ${posX}, elementWidth => ${elementWidth}, elementHeight => ${elementHeight}`);

            // Get the center of the element
            // let x: number = event.pageX - posX - elementWidth / 2;
            // let y: number = event.pageY - posY - elementHeight / 2;
            //
            // this.log.debug(`x => ${x}, y => ${y}`);


            //let spanElement = this.renderer.createElement(this.nativeElement, "span");
            this.renderer.setElementClass(this.nativeElement, "ripple", true);

            // this.renderer.setElementStyle(this.nativeElement, "width", `${elementWidth}px`);
            // this.renderer.setElementStyle(this.nativeElement, "height", `${elementHeight}px`);
            // this.renderer.setElementStyle(this.nativeElement, "top", `${y}px`);
            // this.renderer.setElementStyle(this.nativeElement, "left", `${x}px`);


            // this.renderer.setElementClass(this.nativeElement, "rippleEffect", true);

        })
    }
}
