import { Directive, ElementRef, Input } from '@angular/core';
import { LoggerService } from "../../services/logger/logger-service";

@Directive({ selector: '[logicole-element-position]' })
export class ElementPositionDirective {

    @Input() leftPosition: string; 

    constructor(private el: ElementRef, private logger: LoggerService) { 
        if (this.el.nativeElement)   {
           this.logger.debug(el.nativeElement.toString())
        }


    }

    public setPosition(leftPos: string) { //positionModel: PositionModel
        this.el.nativeElement.style.position = 'absolute';
        this.el.nativeElement.style.left = leftPos;
        // this.el.nativeElement.style.left = positionModel.leftPos;
        // this.el.nativeElement.style.right = positionModel.rightPos;
        // this.el.nativeElement.style.top = positionModel.topPos;
        // this.el.nativeElement.style.left = positionModel.bottomPos;
    }
}

export class PositionModel {
   leftPos: number;
   rightPos: number; 
   topPos: number; 
   bottomPos: number;
}