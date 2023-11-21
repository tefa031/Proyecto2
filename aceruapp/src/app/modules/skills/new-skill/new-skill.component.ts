import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { CompetenciaService } from '../services/competencia.service';
import { Competencia } from '../model/competencia';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.less']
})
export class NewSkillComponent implements OnInit {

  titulo: string = 'Nueva competencia';
  nombreBoton: string = 'Crear';
  idCompetencia: any;
  dataCompetencia: any;
  competenciaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private competenciaService: CompetenciaService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.competenciaForm = this.fb.group({
      id: [],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      formulario: ['', [Validators.required]],
      estado: ['VIGENTE']
    }, { validators: this.validateFechaHora });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCompetencia = parseInt(params.id);

      if (!isNaN(this.idCompetencia)) {
        this.titulo = 'Editar competencia';
        this.nombreBoton = 'Actualizar';

        this.competenciaService.buscarCompetenciaPorId(this.idCompetencia).subscribe({
          next: (data) => {
            this.dataCompetencia = data;

            this.competenciaForm.controls['id'].setValue(data.id);
            this.competenciaForm.controls['nombre'].setValue(data.nombre);
            this.competenciaForm.controls['descripcion'].setValue(data.descripcion);
            this.competenciaForm.controls['fechaInicio'].setValue(data.fechaInicio);
            this.competenciaForm.controls['fechaFinal'].setValue(data.fechaFinal);
            this.competenciaForm.controls['estado'].setValue(data.estado);
            this.competenciaForm.controls['formulario'].setValue(data.formulario);
          },
          error: (error) => {
          }
        });
      } else {
        this.competenciaForm.get('fechaFinal')?.disable();
      }
    });
  }

  isValidField(field: string): boolean | null {
    return (
      this.competenciaForm.controls[field].errors &&
      this.competenciaForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.competenciaForm.controls[field]) return null;

    const errors = this.competenciaForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo ${field} es requerido`;
        case 'fechaHoraInvalida':
          return "La hora de finalización debe ser posterior a la hora de inicio."
      }
    }
    return null;
  }

  onFechaInicioChange() {
    const fechaInicio = this.competenciaForm.get('fechaInicio');
    const fechaFinal = this.competenciaForm.get('fechaFinal');

    if (fechaInicio?.valid && fechaInicio?.value !== '') {
      fechaFinal?.enable();
    } else {
      fechaFinal?.disable();
    }
  }

  guardarCompetencia() {
    if (this.competenciaForm.valid) {
      const nuevaCompetencia: Competencia = this.competenciaForm.value;

      let mensaje = "Competencia creada con éxito!"

      if (this.competenciaForm.value.id != '') {
        mensaje = "Competencia actualizada con éxito!"
      }

      this.competenciaService.crearCompetencia(nuevaCompetencia).subscribe({
        next: () => {
          this.toaster.success(mensaje);
          this.retornar()
        },
        error: (error) => {
          this.toaster.error('No se pudo realizar la operación');
        }
      });
    }
  }

  retornar() {
    this.router.navigate(['/skills'])
  }

  validateFechaHora(group: FormGroup): ValidationErrors | null {
    const fechaInicio = new Date(group.get('fechaInicio')?.value);
    const fechaFinal = new Date(group.get('fechaFinal')?.value);
  
    if (fechaFinal <= fechaInicio) {
      console.log('Error de fecha y hora');
      group.controls['fechaFinal'].setErrors({ fechaHoraInvalida: '' });
      return { fechaHoraInvalida: true };
    }
  
    return null;
  }
  
}
