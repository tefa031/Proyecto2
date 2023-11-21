import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { LoginUsuario } from '../models/login-usuario';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/data-service';
import { PerfilService } from '../../profile/service/perfil.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {

  isLogin = false;
  isLoginError = false;
  loginUsuario?: LoginUsuario;
  roles: string[] = [];
  errorMensaje?: string;

  actualmodule = 'login';
  

  loginForm = this.fb.group({
    nombreUsuario: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serviceNavigation: NavigationService,
    private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private dataService: DataService<any>,
    private perfilService: PerfilService,
  ) {}

  ngOnInit(): void {
    // comprobamos si ya estamos logeados
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.isLoginError = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.route.paramMap.subscribe(
      ({ params }: any) => (this.actualmodule = params.module)
    );
  }

  redirect(page: string) {
    this.serviceNavigation.redirect(page);
  }

  login() {
    if (this.loginForm.valid) {
      this.loginUsuario = new LoginUsuario(
        this.loginForm.value.nombreUsuario,
        this.loginForm.value.password
      );

      this.authService.login(this.loginUsuario).subscribe({
        next: (dato) => {
  
          this.isLogin = true;
          this.isLoginError = false;
      
          this.tokenService.setToken(dato.token!);
          this.tokenService.setUserName(dato.nombreUsuario!);
          this.tokenService.setAuthorities(dato.authorities!);
          this.roles = dato.authorities!;


          const nombre = this.tokenService.getUserName();
        
          if(nombre){
            this.perfilService.buscarUsuarioPorNombre(nombre).subscribe({
              next: (respuesta) =>{
                this.dataService.clearData();
                this.dataService.setUsuario(respuesta);
              },
              error:(error) => {
          
              }
            })
          }


          this.redirect('home');
         
        },
        error: (err) => {
          this.isLogin = false;
          this.isLoginError = true;
          this.errorMensaje = err.error.mensaje;
          this.toastr.error("Credenciales incorrectos", "Login")
        }
      });
      
    }
  }
}
