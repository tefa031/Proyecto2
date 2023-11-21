import { Component, OnInit } from '@angular/core';
import { CodeWindowComponent } from 'src/app/shared/components/code-window/code-window.component';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { EXERCISES } from 'src/app/shared/constants/constants-submissions';


@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.less']
})
export class SubmissionsComponent implements OnInit {
exercises=EXERCISES
  constructor(private serviceDialog:DialogService) { }

  ngOnInit() {
  }
  openConsol(event:any)
  {
    console.log(event);
    let headers=EXERCISES.headers.filter(header=>header.accesor!=="accion")
    let dialog= this.serviceDialog.openNewDialog(CodeWindowComponent,{itemSelected:event.item,headers},{})
  }
}
