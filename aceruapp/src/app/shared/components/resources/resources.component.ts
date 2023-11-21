import { Component, Input, OnInit } from '@angular/core';
import { DATA_RESOURCES } from '../../constants/constants-home';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.less']
})
export class ResourcesComponent implements OnInit {
  
  @Input() data = DATA_RESOURCES;
  constructor() { }

  ngOnInit() {
  }

}
