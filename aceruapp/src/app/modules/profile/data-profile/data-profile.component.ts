
import { Component, OnInit } from '@angular/core';
import { ROLES } from 'src/app/shared/constants/constants-auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TokenService } from '../../auth/services/token.service';
import { PerfilService } from '../service/perfil.service';
import { AuthService } from '../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-data-profile',
  templateUrl: './data-profile.component.html',
  styleUrls: ['./data-profile.component.less'],
})
export class DataProfileComponent implements OnInit {
  
  roles = ROLES;
  rolesDisponibles = ['Administrador', 'Participante'];
  correoBan:any;
  foto?: any
  

  public perfilForm = this.fb.group({
    id: '',
    nombre: ['', [Validators.required]],
    nombreUsuario: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    rol: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private autoservice: TokenService,
    private perfilService: PerfilService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
  
    const userName = this.autoservice.getUserName();
    const rolNombre =  this.autoservice.getAuthorities()[0] !== 'ROLE_ADMIN'? 'user':'admin';

    if(userName){
      this.perfilService.buscarUsuarioPorNombre(userName).subscribe({
        next: (respuesta) =>{

          console.log("USUARIO: ", respuesta) // foto : base64
          this.foto = respuesta.foto;

          this.perfilForm = this.fb.group({
            id: [respuesta.id],
            nombre: [respuesta.nombre, Validators.required],
            nombreUsuario: [respuesta.nombreUsuario, Validators.required],
            email: [ respuesta.email, [Validators.required, Validators.email] ],
            rol: [{ value: rolNombre, disabled: true }] 
          });
          this.correoBan = respuesta.email;
        },
        error:(error) => {
    
        }
      })
    }

  }

  isValidField(field: string): boolean | null {
    return this.perfilForm.controls[field].errors
      && this.perfilForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.perfilForm.controls[field]) return null;

    const errors = this.perfilForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;

        case 'minlength':
          return `El campo ${field} debe tener al menos mínimo ${errors['minlength'].requiredLength} caracters.`;

        case 'email':
          return `El campo ${field} debe ser un correo válido.`;

        case 'invalidEmail':
          return `El campo ${field} ya se encuentra registrado.`;
      }
    }

    return null;
  }

  isValidadEmail(event: any) {

    if (this.perfilForm.controls['email'].valid && this.perfilForm.controls['email'].value != this.correoBan){

      const email = (event.target as HTMLInputElement).value;

      this.authService.getValidarCorreo(email).subscribe(res => {
        if(res){
          this.perfilForm.controls['email'].setErrors({ invalidEmail: '' });
        }else{
          this.perfilForm.controls['email'].setErrors(null);
        }
      });
    }
  }

  actualizarPerfil() {
    if (this.perfilForm.valid) {
      const usuarioData = this.perfilForm.value;
      this.authService.actualizarPerfil(usuarioData).subscribe({
        next: (response) => {
          this.toastr.info('Perfil actualizado exitosamente');
        },
        error:(error) => {
          this.toastr.error('Error al actualizar el perfil', error);
        }
    });
    }
  }







}
