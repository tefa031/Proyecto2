import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private serviceUser:UserService) { }

  ngOnInit() {


  }

backgroundRol()
{

 if(this.serviceUser.getRegisterUserLogged()?.rol==="Administrador")
 {
  return '#A7CEFC';
 }
 return null
}

}
