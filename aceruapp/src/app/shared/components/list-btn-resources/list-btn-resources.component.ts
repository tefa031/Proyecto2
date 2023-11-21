import { Component, Input, OnInit } from '@angular/core';
import { DATA_LIST_BTN_RESOURCES } from '../../constants/constants-home';

@Component({
  selector: 'app-list-btn-resources',
  templateUrl: './list-btn-resources.component.html',
  styleUrls: ['./list-btn-resources.component.less']
})
export class ListBtnResourcesComponent implements OnInit {
  @Input() data=DATA_LIST_BTN_RESOURCES;
  constructor() { }

  ngOnInit() {
  }

}
