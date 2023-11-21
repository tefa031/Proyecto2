import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialog: DialogComponent|any;
  constructor(){
  }

  openNewDialog(component:any, data:any, options = {}){
    const newDialog = this.dialog.createNewDialog(component, data, options);
    return newDialog.instance;
  }

  setDialog(dialog:any){
    this.dialog = dialog;
  }
}
