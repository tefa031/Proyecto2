import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROLES } from 'src/app/shared/constants/constants-auth';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UsuarioServices } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {


  @ViewChild('imagenInputFile', { static: false }) imagenInputFile?: ElementRef;

  isRegistro = false;
  isRegistroError = false;
  nuevoUsuario?: NuevoUsuario;
  errorMensaje?: string;
  selectedFile?:  null;


  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    nick: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(5)]],
    rol: ['user', Validators.required ],
    foto: [ '', Validators.required ]
  });


  constructor(
    private fb: FormBuilder,
    private serviceNavigation: NavigationService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

  }

  redirect(page: string) {
    this.serviceNavigation.redirect(page);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  


  isValidField(field: string): boolean | null {
    return this.registerForm.controls[field].errors
      && this.registerForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field].errors || {};

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

    if (this.registerForm.controls['email'].valid){

      const email = (event.target as HTMLInputElement).value;

      this.authService.getValidarCorreo(email).subscribe(res => {
        if(res){
          this.registerForm.controls['email'].setErrors({ invalidEmail: '' });
        }else{
          this.registerForm.controls['email'].setErrors(null);
        }
      });
    }
  }

  register() {

    if (this.registerForm.valid) {

      const roles = [this.registerForm.value.rol];

      const formData = new FormData();

      this.nuevoUsuario = {
        nombre: this.registerForm.value.nombre,
        nombreUsuario: this.registerForm.value.nick,
        email: this.registerForm.value.email,
        password: this.registerForm.value.contrasena,
        roles: roles,
        foto: '',
      };


      formData.append(
        'nuevoUsuario',
        new Blob([JSON.stringify(this.nuevoUsuario)], { type: 'application/json' }));

      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }


      this.authService.nuevo(formData).subscribe({
        next: (response) => {
          this.isRegistro = true;
          this.isRegistroError = false;
          this.redirect('auth/login');
        },
        error: (err) => {
          this.isRegistro = false;
          this.isRegistroError = true;
          this.errorMensaje = err.error.mensaje;
          this.toastr.error(this.errorMensaje, "Registro")
        }
      });

    }
  }

}
