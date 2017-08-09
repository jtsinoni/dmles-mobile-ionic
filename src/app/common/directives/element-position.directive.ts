import { Directive, ElementRef, Input } from '@angular/core';
import { LoggerService } from "../../services/logger/logger-service";

@Directive({ selector: '[logicole-element-position]' })
export class ElementPositionDirective {

    @Input() fixedPosition: string;
    standardMargin: string = "2em";
    topMargin: string = "12em";
    bottomMargin: string = "6em";

    constructor(private el: ElementRef, private logger: LoggerService) {
        if (this.el.nativeElement) {
            //this.logger.debug(el.nativeElement.toString())
        }

        this.el.nativeElement.style.position = 'absolute';
        this.el.nativeElement.style.right = this.standardMargin;
        this.el.nativeElement.style.bottom = this.bottomMargin;
    }   


    public setPosition(leftRightPos: string, topBottomPos) { //positionModel: PositionModel
        if (leftRightPos === "right") {
            this.el.nativeElement.style.right = this.standardMargin;
            this.el.nativeElement.style.left = null;
        } else {
            this.el.nativeElement.style.left = this.standardMargin;
            this.el.nativeElement.style.right = null;
        }

        if (topBottomPos === "top") {
            this.el.nativeElement.style.top = this.topMargin;
            this.el.nativeElement.style.bottom = null;
        } else {
            this.el.nativeElement.style.bottom = this.bottomMargin;
            this.el.nativeElement.style.top = null;
        }
    }
}
