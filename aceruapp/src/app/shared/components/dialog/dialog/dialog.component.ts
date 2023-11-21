import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {

  @ViewChild('dialogDiv', {read: ViewContainerRef}) dialogDiv: ViewContainerRef|any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  createNewDialog(component:any, data:any, options:any = {}){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomDialogComponent);
    const componentRef = this.dialogDiv.createComponent(componentFactory);
    Object.keys(options).forEach( (option) => {
      componentRef.instance[option] = options[option];
    });
    const subscriptionInit = componentRef.instance.afterInitLoaded.subscribe( (init:any) => {
      if(init){
        this.openDialog(componentRef, component, data);
      }
    });
    const subscriptionClose = componentRef.instance.completeClosed.subscribe( (close:any) => {
      if(close){
        subscriptionInit.unsubscribe();
        subscriptionClose.unsubscribe();
        componentRef.destroy();
      }
    });
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  openDialog(dialog:any, component:any, data:any){
    (dialog.instance as CustomDialogComponent).open(component,data);
  }

}
