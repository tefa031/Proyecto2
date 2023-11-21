import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import swall from 'sweetalert2';
import { Usuario } from '../auth/models/usuario';
import { UsuarioService } from './services/usuario.service';
import { TokenService } from '../auth/services/token.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.less'],
})
export class RankingComponent implements AfterViewInit, OnInit {
  
  competencias: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  columnas: string[] = [
    //'ID',
    'PARTICIPANTE',
    'NICK',
    'EMAIL',
    'RANGO',
  ];

  dataSource = new MatTableDataSource<Usuario>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    public tokenService: TokenService
  ) {}

  ngOnInit() {

    if (this.tokenService.getAuthorities().includes('ROLE_ADMIN')) {
      this.columnas.push('ACCIONES');
    }

    this.listarUsuariosParticipantes();
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

  calificar(fila: any) {
    console.log("FILA: ", fila); // tiene el fila.id -> usuario id
    const rangoActual = fila.rango;
    const nombreUsuario = fila.nombre
    // Mostrar el cuadro de diálogo para seleccionar el nuevo rango
    swall.fire({
      html: `<span style="font-size: 18px;">Cambiar Rango de: <strong style="text-transform: capitalize;">${nombreUsuario}</strong> </span>`,
      input: 'select',
      inputOptions: {
        'RANGOS': {
          'PLATINO': 'PLATINO',
          'DIAMANTE': 'DIAMANTE',
          'ORO': 'ORO',
          'PLATA': 'PLATA',
          'BRONCE': 'BRONCE'
        }
      },
      inputPlaceholder: 'Selecciona un nuevo rango',
      inputValue: rangoActual,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            this.usuarioService.actualizarRangoUsuario(fila.id, value).subscribe({
              next:(response) => {
                resolve('');
                this.listarUsuariosParticipantes();
              },
              error:(error) => {
                console.log("ERROR: ", error)
                resolve('Error al actualizar el rango.' + error);
              }
            }
            );
          } else {
            resolve('Debes seleccionar un nuevo rango.');
          }
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Puedes agregar código adicional después de que se confirma la selección
        swall.fire({
          html: '<span style="font-size: 16px;">Rango actualizado con éxito!</span>',
          icon: 'success'
        });
      }
    });
  }
  

  listarUsuariosParticipantes() {
    this.usuarioService.getListarUsuarioParticipantes().subscribe({
      next: (dato) => {
        this.dataSource = new MatTableDataSource(dato);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {},
    });
  }
}
