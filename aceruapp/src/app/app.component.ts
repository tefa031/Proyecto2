import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from './shared/components/dialog/dialog.service';
import { DialogComponent } from './shared/components/dialog/dialog/dialog.component';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewChecked,OnInit {
  title = 'ACERU';
  @ViewChild('dialog') dialog: DialogComponent|any;

  constructor(private dialogService: DialogService,private serviceUser:UserService){

  }
  ngAfterViewChecked(): void {
this.serviceUser.hiddenForRol();
  }
  ngOnInit(): void {



  }
  ngAfterViewInit(): void {
    this.dialogService.setDialog(this.dialog);
  }
}
