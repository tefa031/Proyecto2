import { TokenService } from 'src/app/modules/auth/services/token.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  DATA_CATEGORY_HEADERS,
  DATA_CATEGORY_HEADERS_P,
  DATA_CATEGORY_PROBLEMS,
  DATA_CATEGORY_PROBLEMS_P,
} from 'src/app/shared/constants/constants-problems';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Problema } from '../model/problema';
import { ProblemaService } from '../services/problema.service';
import { ThemePalette } from '@angular/material/core';
import { DataService } from 'src/app/shared/services/data-service';
import swall from 'sweetalert2';

@Component({
  selector: 'app-list-problems',
  templateUrl: './list-problems.component.html',
  styleUrls: ['./list-problems.component.less'],
})
export class ListProblemsComponent implements AfterViewInit , OnInit {

  data: any;
  faSearch = faSearch;
  faTimes = faTimes;
  idCategoria?: any;
  nombreCategoria?: string;
  showInactivos = false; 


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'EJERCICIO', 'DIFICULTAD', 'ACCIONES'];
  dataSource = new MatTableDataSource<Problema>([]);

  constructor(
    private route: ActivatedRoute,
    private serviceNavigation: NavigationService,
    private  problemaService: ProblemaService,
    private dataservice: DataService<any>,
    private router: Router,
    public tokenService: TokenService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {

      this.idCategoria = parseInt(params.id);
      this.nombreCategoria = params.nombre;
  
      if (typeof this.idCategoria === 'number') {
        this.listarProblemas(this.idCategoria, "Activo");
      } else {
        console.error("idCategoria is undefined or not a number");
      }
    });

  }
  
  abrirVentanaNuevoProblema(){
    this.dataservice.clearData();
    this.router.navigate(['/problems/category/'+this.idCategoria+'/'+this.nombreCategoria+'/new-problem'])
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

  clearSearch() {}

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter);
  }

  listarProblemas(idCategoria: number, estado: string ){
    this.problemaService.getListarProblema(idCategoria, estado).subscribe({
      next: (dato) =>{
        this.dataSource = new MatTableDataSource(dato)
        this.dataSource.paginator = this.paginator;
      },
      error: (error) =>{

      }
    })
  }

  mostrarInactivos(){

    if (this.showInactivos) {
      this.listarProblemas(this.idCategoria, "Activo")
    } else {
      this.listarProblemas(this.idCategoria, "Inactivo")
    }
  }

  editarProblema(fila: any){
    
    this.dataservice.clearData();
    this.dataservice.setData(fila);
    this.router.navigate(['/problems/category/'+this.idCategoria+'/'+this.nombreCategoria+'/new-problem'])

  }

  bloquearProblema(fila: any): void {
    
    const esInactivo = fila.estado === 'Inactivo';
    const nuevoEstado = esInactivo ? 'Activo' : 'Inactivo';
    const accion = esInactivo ? 'Habilitar' : 'Desabilitar';
    const accion2 = esInactivo ? 'Habilitado' : 'Desabilitado';
    const mensaje = `¿Estás seguro que deseas <strong>${accion}</strong>: <strong>${fila.nombre}</strong>?`;
    const exitoMensaje = `${accion2} la problema correctamente`;
  
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
          this.problemaService.cambiarEstadoProblema(fila.id, nuevoEstado).subscribe({
            next: () => {
              swall.fire(
                accion2,
                exitoMensaje,
                'success'
              );
  
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate(['/problems/category/' + this.idCategoria + '/' + this.nombreCategoria], {
                relativeTo: this.route,
              });
            },
            error: (error) => {
              console.error(error);
              swall.fire(
                accion2,
                'No se pudo realizar la acción',
                'warning'
              );
            },
          });
        }
      });
  }

  resolverProblema(fila: any){
    this.dataservice.clearData();
    this.dataservice.setData(fila);
    this.router.navigate(['/problems/category/description-problem/'+fila.categoria.id+'/'+fila.id])
  }

}
