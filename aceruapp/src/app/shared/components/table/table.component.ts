import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  @Input() data: any
  @Output() eventEmmiter = new EventEmitter()
  constructor() { }

  ngOnInit() {
    console.log("table",this.data);

  }
  isIcon(value: any) {
    if (Array.isArray(value)) {
      return ["assets", "http", "jpg", "png", "svg", "gif"].some(valueCheck => value.some(val => val.value.includes(valueCheck)))
    }
    return false
  }
  sendEvent(item:any,event?:any) {
    item&& this.eventEmmiter.emit({item,event})
  }
}
