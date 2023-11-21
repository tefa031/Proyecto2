import { TokenService } from 'src/app/modules/auth/services/token.service';
import { Component, Input, OnInit } from '@angular/core';
import { DATA_MAIN } from 'src/app/shared/constants/constants-home';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.less']
})
export class MainSectionComponent implements OnInit {

@Input() dataMain=DATA_MAIN;

constructor(
  public serviceUser:UserService,
  public tokenService: TokenService
  ) { }

  ngOnInit() {
  }

}
