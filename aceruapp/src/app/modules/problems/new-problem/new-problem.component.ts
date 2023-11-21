import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProblemaService } from '../services/problema.service';
import { Problema } from '../model/problema';
import { DataService } from 'src/app/shared/services/data-service';

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.less'],
})
export class NewProblemComponent implements OnInit {

  dificultad = ['Fácil', 'Intermedio', 'Dificil'];
  idCategory: any;
  nombreCategoria: any;
  nombreboton: string = 'Guardar problema';
  titulo: string = 'Nuevo Problema';
  datoProblema?:any;
  
  public problemaForm = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    entradas: ['', [Validators.required]],
    salidas: ['', [Validators.required]],
    ejemploEntradas: ['', [Validators.required]],
    ejemploSalidas: ['', [Validators.required]],
    dificultad: ['Facil', [Validators.required]],
  });

  constructor(
    private serviceNavigation: NavigationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private problemaService: ProblemaService,
    private dataService: DataService<any>
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(({ params }: any) => {

      this.idCategory = parseInt(params.id);
      this.nombreCategoria = params.nombre;

    });

    this.datoProblema = this.dataService.getData();

    if( this.datoProblema != null){

      this.nombreboton = "Actualizar problema";
      this.titulo= "Editar Problema";

      this.problemaForm.controls['id'].setValue(this.datoProblema.id);
      this.problemaForm.controls['nombre'].setValue(this.datoProblema.nombre);
      this.problemaForm.controls['descripcion'].setValue(this.datoProblema.descripcion);
      this.problemaForm.controls['entradas'].setValue(this.datoProblema.entradas);
      this.problemaForm.controls['salidas'].setValue(this.datoProblema.salidas);
      this.problemaForm.controls['ejemploEntradas'].setValue(this.datoProblema.ejemploEntradas);
      this.problemaForm.controls['ejemploSalidas'].setValue(this.datoProblema.ejemploSalidas);
      this.problemaForm.controls['dificultad'].setValue(this.datoProblema.dificultad);

    }

  }

  isValidField(field: string): boolean | null {
    return (
      this.problemaForm.controls[field].errors &&
      this.problemaForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.problemaForm.controls[field]) return null;

    const errors = this.problemaForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;
      }
    }

    return null;
  }

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page + this.idCategory, parameter);
  }

  saveProblem() {
    if (this.problemaForm.valid) {

      let mensaje = "Problema creada con exito!"

      if(this.problemaForm.value.id != ''){

        mensaje = "Problema actualizado con exito!"
      }
      
      const nuevoProblema: Problema = this.problemaForm.value;
      nuevoProblema.estado = "Activo"
      
      this.problemaService.guardarProblema(nuevoProblema, this.idCategory).subscribe({
        next: () => {
          this.toaster.success(mensaje);
          this.retornar()
        },
        error:(error) => {
          this.toaster.error('No se pudo crear el problema');
        }}
      );
    }
  }

  retornar(){
    this.router.navigate(['/problems/category/'+this.idCategory+'/'+this.nombreCategoria])
  }
  

}
