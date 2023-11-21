import { Component, Input, OnInit } from '@angular/core';
import { DATA_NEWS } from '../../constants/constants-home';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {
  @Input() data: any = DATA_NEWS;
  editItem: any;
  setEdit = (item: any) => {
    item['edit'] = item['edit'] ? false : true
  }
  actions = [{ value: "assets/images/crud/lapiz.png", event: "edit", callback: this.setEdit },
   { value: "assets/images/crud/eliminar.png", event: "delete", callback: this.setEdit }]
  constructor(public serviceUser: UserService) { }

  ngOnInit() {
  }

}
