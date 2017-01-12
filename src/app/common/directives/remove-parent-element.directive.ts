import {Directive, ElementRef} from "@angular/core";

@Directive({
    selector: '[remove-parent-element]'
})
export class RemoveParentElementDirective {
    constructor(private elementRef: ElementRef) {
    }

    //wait for the component to render completely
    ngOnInit() {
        let nativeElement: HTMLElement = this.elementRef.nativeElement,
            parentElement: HTMLElement = nativeElement.parentElement;

        // move all children out of the element
        while (nativeElement.firstChild) {
            parentElement.insertBefore(nativeElement.firstChild, nativeElement);
        }

        // remove the empty element(the host)
        parentElement.removeChild(nativeElement);
    }
}
