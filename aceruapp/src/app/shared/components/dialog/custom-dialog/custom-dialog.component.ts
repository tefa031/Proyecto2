import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.less']
})
export class CustomDialogComponent implements  AfterViewInit {


  @ViewChild('componentHolder', { read: ViewContainerRef }) componentHolder: ViewContainerRef|any;
  @Output() closeDialog = new EventEmitter<string>();
  @Output() completeClosed = new EventEmitter<boolean>();
  @Output() customEvent = new EventEmitter<string>();
  @Output() afterInitLoaded = new EventEmitter<boolean>();
  @Input() maxWidthContainer = '100vw';
  @Input() maxWidthDialog = 800;
  @Input() hidePadding = false;
  @Input() maxHeightContainer='100vh'
  show = false;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.afterInitLoaded.emit(true);
    }, 5);
  }

  open(component:any, data:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = this.componentHolder.createComponent(componentFactory);
    this.show = true;
    (componentRef.instance as any).data = data;
    if ((componentRef.instance as any).customEvent) {
      (componentRef.instance as any).customEvent.subscribe((res:any) => {
        this.customEvent.emit(res);
      });
    }

    (componentRef.instance as any).closeDialog.subscribe((res:any) => {
      this.show = false;
      this.closeDialog.emit(res);
      setTimeout(() => {
        this.completeClosed.emit(true);
        componentRef.destroy();
      }, 300);
    });
    return (componentRef.instance as any);
  }

}
