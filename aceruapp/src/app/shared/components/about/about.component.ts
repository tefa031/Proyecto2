import { Component, Input, OnInit } from '@angular/core';
import { DATA_ABOUT } from '../../constants/constants-home';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {
  @Input() data = DATA_ABOUT;
  constructor() { }

  ngOnInit() {
  }

}
