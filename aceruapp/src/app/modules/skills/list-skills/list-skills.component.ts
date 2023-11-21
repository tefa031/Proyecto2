import { TokenService } from './../../auth/services/token.service';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Competencia } from '../model/competencia';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';
import { MatPaginator } from '@angular/material/paginator';
import { CompetenciaService } from '../services/competencia.service';
import { DatePipe } from '@angular/common';
import swall from 'sweetalert2';

@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.less'],
})
export class ListSkillsComponent implements AfterViewInit, OnInit {
  competencias: Competencia[] = [];
  showInactivos = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = [
    'ID',
    'COMPETENCIA',
    'FECHA INICIO',
    'FECHA FINAL',
    'ESTADO',
    'TIEMPO DE COMPETENCIA',
    'ACCIONES',
  ];

  dataSource = new MatTableDataSource<Competencia>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DataService<any>,
    private competenciaService: CompetenciaService,
    public tokenService: TokenService
  ) {}

  ngOnInit() {
    this.listarCompetencias('VIGENTE');
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarCompetencias(estado: string): void {
    this.competenciaService.listarCompetencias(estado).subscribe({
      next: (data) => {
        this.competencias = data;
        console.log(this.competencias);
        this.dataSource = new MatTableDataSource(this.competencias);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log('ERROR EN LISTAR: ', error);
      },
    });
  }

  mostrarInactivos() {
    if (this.showInactivos) {
      this.listarCompetencias('VIGENTE');
    } else {
      this.listarCompetencias('TERMINADO');
    }
  }

  editarCompetencia(fila: any) {
    this.router.navigate(['skills/new-skill/edit/' + fila.id]);
  }

  eliminarCompetencia(fila: any) {
    const mensaje = `¿Estás seguro que deseas <strong>Eliminar</strong>: <strong>${fila.nombre}</strong>?`;

    swall
      .fire({
        html: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.competenciaService.eliminarCompetencia(fila.id).subscribe({
            next: () => {
              swall.fire(
                'Eliminado!',
                'Se realizo la operacion exitosamente!',
                'success'
              );

              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate(['/skills'], {
                relativeTo: this.route,
              });
            },
            error: (error) => {
              console.error(error);
              swall.fire(
                'Eliminado',
                'No se pudo realizar la acción',
                'warning'
              );
            },
          });
        }
      });
  }

  detalleCompetencia(fila: any) {
    this.router.navigate(['skills/new-skill/description/' + fila.id]);
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
