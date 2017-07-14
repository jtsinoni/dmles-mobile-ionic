import { Directive, ViewContainerRef } from '@angular/core';

@Directive( {
    selector: '[sub-header-directive]',   
})
export class SubHeaderDirective {
   constructor(public viewContainerRef: ViewContainerRef) {}
}