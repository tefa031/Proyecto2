import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-code-window',
  templateUrl: './code-window.component.html',
  styleUrls: ['./code-window.component.less']
})
export class CodeWindowComponent implements OnInit {
dataHeader:any
excercise=`#include <iostream>

int main ()
{
    std::cout << "Hola, mundo";
    return 0;
}`
  @Output() closeDialog=new EventEmitter();
  @Input()data:any={}
  constructor() { }

  ngOnInit() {
    console.log(this.data);

    this.dataHeader=this.data?.headers
  }

  close(res=false)
  {
    this.closeDialog.emit(res)
  }
}
