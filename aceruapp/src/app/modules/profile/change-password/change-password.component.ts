
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PerfilService } from '../service/perfil.service';
import { TokenService } from '../../auth/services/token.service';
import { Router } from '@angular/router';
import swall from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(

    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private perfilService: PerfilService,
    private tokenService: TokenService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contrasenaActual: ['', Validators.required],
      newContrasena: ['', Validators.required],
      newContrasena2: ['', Validators.required],
    },
    {
      validator: this.passwordMatchValidator, // Agrega el validador personalizado
    });
  }


  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newContrasena')?.value;
    const confirmPassword = group.get('newContrasena2')?.value;

    if (password === confirmPassword) {
      return null; 
    } else {
      return { mismatch: true };
      
    }
  }

  cancelar(){
    this.router.navigate(['/profile']);
  }

  changePassword() {
    if (this.form.valid) {
      let nombreUsuario2 = this.tokenService.getUserName() || '';
      const contrasenaActual = this.form.get('contrasenaActual')?.value;
      const nuevaContrasena = this.form.get('newContrasena')?.value;
  
      if (contrasenaActual === nuevaContrasena) {
        this.toaster.error('La nueva contraseña debe ser diferente de la contraseña actual.');
      } else {
        this.perfilService.cambiarContrasena(nombreUsuario2, contrasenaActual, nuevaContrasena).subscribe(
          (response) => {
            // console.log('Contraseña cambiada exitosamente', response);
            // this.toaster.success('El cambio de contraseña fue exitoso');
            // this.tokenService.logOut();
            // this.router.navigate(['/home']);

            swall.fire({
              title: 'Contraseña cambiada',
              text: '¿Desea cerrar sesión y volver a iniciar sesión con su nueva contraseña?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Sí, cerrar sesión',
              cancelButtonText: 'No, mantener sesión',
            }).then((result) => {
              if (result.isConfirmed) {
                this.tokenService.logOut();
                this.router.navigate(['/home']);
              }else{
                this.router.navigate(['/profile']);
              }

              this.toaster.success('El cambio de contraseña fue exitoso');
            });


          },
          (error) => {
            this.toaster.error('La contraseña actual no es correcto!');
          }
        );
      }
    } else {
      this.toaster.error('Las contraseñas nueva no coinciden');
    }
  }
  
  
}
