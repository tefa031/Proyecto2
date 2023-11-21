import { CompetenciaService } from './../services/competencia.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { TokenService } from '../../auth/services/token.service';

@Component({
  selector: 'app-description-skill',
  templateUrl: './description-skill.component.html',
  styleUrls: ['./description-skill.component.less','./description-skill.component2.less'],
})
export class DescriptionSkillComponent implements OnInit {
  idCompetencia: any;
  dataCompetencia: any;
  currentDate: Date = new Date();
  diferencia: string = '';

  public competenciaForm = this.fb.group({
    id: [],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]],
    estado: ['VIGENTE'],
  });

  constructor(
    private serviceNavigation: NavigationService,
    private fb: FormBuilder,
    private competenciaService: CompetenciaService,
    private route: ActivatedRoute,
    public autoservice: TokenService,
    private toster: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCompetencia = parseInt(params.id);

      if (this.idCompetencia != null) {
        this.competenciaService
          .buscarCompetenciaPorId(this.idCompetencia)
          .subscribe({
            next: (data) => {
              this.dataCompetencia = data;

              this.competenciaForm.patchValue({
                id: data.id,
                nombre: data.nombre,
                descripcion: data.descripcion,
                fechaInicio: data.fechaInicio,
                fechaFinal: data.fechaFinal,
                estado: data.estado,
              });

              this.diferencia = this.calculateTimeDifference(
                this.dataCompetencia.fechaInicio,
                this.dataCompetencia.fechaFinal
              );
            },
            error: (error) => {},
          });
      } else {
        this.competenciaForm.get('fechaFinal')?.disable();
      }
    });
  }

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter);
  }

  inscribirse() {
    const userName = this.autoservice.getUserName();
    const authorities = this.autoservice.getAuthorities();

    if (userName === null) {
      this.toster.error(
        'Debes iniciar sesión para inscribirte en la competencia.'
      );
      return;
    }

    if (authorities === null) {
      this.toster.error(
        'No se pudo determinar tu rol. Por favor, vuelve a iniciar sesión.'
      );
      return;
    }
   

    if (authorities[0] === 'ROLE_ADMIN') {
      this.toster.error(
        'Los administradores no pueden inscribirse en competencias.'
      );
      return;
    }

    // Si pasa todas las validaciones, se realiza la inscripción
    this.competenciaService
      .insertCompetencia(userName, this.idCompetencia)
      .subscribe({
        next: (data) => {
          this.toster.info(
            'Te has inscrito en esta competencia correctamente.'
            
          );
              window.location.href = 'https://forms.gle/nzr4QgxbM3iRJaUs7';
       
        },
        
        error: (error) => {
          this.toster.error(
            'Ocurrió un error en la operación. Por favor, inténtalo de nuevo más tarde.'
          );
        },
      });
  }

  calculateTimeDifference(fechaInicio: any, fechaFinal: any): string {
    
    const currentDate = new Date();
    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFinal);

    if (currentDate < startDate) {
      const timeDifference = startDate.getTime() - currentDate.getTime();
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

      if (days > 0) {
        return `Faltan ${days} día${days === 1 ? '' : 's'}, ${hours} hora${
          hours === 1 ? '' : 's'
        }, ${minutes} minuto${minutes === 1 ? '' : 's'}`;
      } else if (hours > 0) {
        return `Faltan ${hours} hora${
          hours === 1 ? '' : 's'
        }, ${minutes} minuto${minutes === 1 ? '' : 's'}`;
      } else if (minutes > 0) {
        return `Faltan ${minutes} minuto${minutes === 1 ? '' : 's'}`;
      } else {
        return 'La competencia comienza en breve';
      }
    } else if (currentDate < endDate) {
      const timeDifference = endDate.getTime() - currentDate.getTime();
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

      if (days > 0) {
        return `Faltan ${days} día${days === 1 ? '' : 's'}, ${hours} hora${
          hours === 1 ? '' : 's'
        }, ${minutes} minuto${minutes === 1 ? '' : 's'}`;
      } else if (hours > 0) {
        return `Faltan ${hours} hora${
          hours === 1 ? '' : 's'
        }, ${minutes} minuto${minutes === 1 ? '' : 's'}`;
      } else if (minutes > 0) {
        return `Faltan ${minutes} minuto${minutes === 1 ? '' : 's'}`;
      } else {
        return 'La competencia está a punto de terminar';
      }
    } else {
      const timeDifference = currentDate.getTime() - endDate.getTime();
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

      if (days > 0) {
        return `Hace ${days} día${days === 1 ? '' : 's'}, ${hours} hora${
          hours === 1 ? '' : 's'
        }, ${minutes} minuto${minutes === 1 ? '' : 's'}`;
      } else if (hours > 0) {
        return `Hace ${hours} hora${hours === 1 ? '' : 's'}, ${minutes} minuto${
          minutes === 1 ? '' : 's'
        }`;
      } else if (minutes > 0) {
        return `Hace ${minutes} minuto${minutes === 1 ? '' : 's'}`;
      } else {
        return 'La competencia ha terminado';
      }
    }
  }
}