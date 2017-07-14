import { Component, Input, ViewChild, ComponentFactoryResolver, AfterViewInit } from "@angular/core";
import { ViewController } from "ionic-angular";
import { SubHeaderDirective } from "./sub-header.directive";
import { SubHeaderComponentInterface } from "./sub-header-component.interface";
import { SubHeaderItem } from "./sub-header-item";

import { LoggerService } from "../../../services/logger/logger-service";


@Component({
    selector: 'modal-header',
    templateUrl: './modal-header.component.html',
})

export class ModalHeaderComponent implements AfterViewInit {

    @Input()
    public title: string;
    @Input()
    hasSubHeader: boolean = false;
    @Input()
    public subHeader: SubHeaderItem;
    @ViewChild(SubHeaderDirective)
    subHeaderDirective: SubHeaderDirective;

    constructor(private viewController: ViewController,
        private componentFactoryResolver: ComponentFactoryResolver,
    private log: LoggerService) {
    }

    ngAfterViewInit() {
        if (this.hasSubHeader) {
            this.loadSubHeaderComponent();
        }
    }

    loadSubHeaderComponent() {

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.subHeader.component);
        //if (this.subHeaderDirective) {
            let viewContainerRef = this.subHeaderDirective.viewContainerRef;
            viewContainerRef.clear();

            let componentRef = viewContainerRef.createComponent(componentFactory);
            (<SubHeaderComponentInterface>componentRef.instance).data = this.subHeader.data;
            this.log.debug("subheader data is " + this.subHeader.data);
            this.log.debug("subheader component is " + this.subHeader.component);
        //} 
    }

    cancel() {
        this.viewController.dismiss();
    }
}
