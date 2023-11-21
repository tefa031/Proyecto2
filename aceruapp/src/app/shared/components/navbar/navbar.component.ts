import { TokenService } from './../../../modules/auth/services/token.service';
import { Component, OnInit } from '@angular/core';
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TEXT_LINKS_P } from "../../constants/constants-navbar";
import { NavigationService } from '../../services/navigation.service';
import { UserService } from '../../services/user/user.service';
import { PerfilService } from 'src/app/modules/profile/service/perfil.service';
import { DataService } from '../../services/data-service';
import { Usuario } from 'src/app/modules/auth/models/usuario';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  
  faSearch = faSearch;
  faTimes = faTimes;
  TEXT_LINKS = TEXT_LINKS_P;
  textLinks: any;
  foto:any;
  rol?: string;
  usuario?: Usuario;

  constructor(
    private serviceNavigation: NavigationService,
    public userService: UserService,
    public tokenService: TokenService,
    private perfilService: PerfilService,
    public dataService: DataService<any>,
  ) { 
    
  }

  ngOnInit() {
    this.textLinks = TEXT_LINKS_P;
  }

  redirect(page: string) {
    this.serviceNavigation.redirect(page);
  }

  getActualPage(page: string): any {
    return this.serviceNavigation.getActualPage(page);
  }

  logOut() {
    this.tokenService.logOut();
    this.dataService.clearData()
    this.dataService.clearUsuario()
    this.redirect('home');
  }

  mostra(): boolean {
    return this.userService.islogIn() && !this.getActualPage('home');
  }
}
