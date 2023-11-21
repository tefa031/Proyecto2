import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../services/material.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from '../model/model';
import swall from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';

@Component({
  selector: 'app-list-materials',
  templateUrl: './list-materials.component.html',
  styleUrls: ['./list-materials.component.less'],
})
export class ListMaterialsComponent implements AfterViewInit, OnInit {
  data: any;
  idCategoria?: any;
  nombreCategoria?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = [
    'ID',
    'MATERIAL',
    'DESCRIPCION',
    'TIPO MATERIAL',
    'ACCIONES',
  ];

  dataSource = new MatTableDataSource<Material>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private cdr: ChangeDetectorRef,
    public tokenService: TokenService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCategoria = parseInt(params.id);
      this.nombreCategoria = params.nombre;

      if (typeof this.idCategoria === 'number') {
        this.obtenerListadoCategori(this.idCategoria);
      } else {
        console.error('Error');
      }
    });
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

  editarMaterial(fila: any) {
    this.router.navigate([
      '/materials/new-material/' +
        this.idCategoria +
        '/' +
        this.nombreCategoria +
        '/' +
        fila.id,
    ]);
  }

  eliminarMaterial(fila: any) {
    swall
      .fire({
        html: `¿Estás seguro que deseas desabilitar :  <strong>${fila.nombre}?</strong>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.materialService.eliminarMaterial(fila.id).subscribe({
            next: () => {
              swall.fire(
                'Eliminado!',
                'Se a eliminado la material correctamente',
                'success'
              );

              this.obtenerListadoCategori(this.idCategoria);
              //this.router.navigate(['materials/category/' + this.idCategoria +'/'+this.nombreCategoria ])

            },
            error: () => {
              swall.fire(
                'Eliminado',
                'No se pudo eliminar el material',
                'warning'
              );
            },
          });
        }
      });
  }

  detalleMaterial(fila: any) {
    const elementoDetalle = this.data.find((item: any) => item.id === fila.id);
    if (elementoDetalle) {
      this.router.navigate([
        '/materials/category/presentation-material/' +
          fila.material.id +
          '/' +
          fila.id +
          '/' +
          this.nombreCategoria,
      ]);
    }
  }

  mostrarformnuevomaterial() {
    this.router.navigate([
      '/materials/new-material/' +
        this.idCategoria +
        '/' +
        this.nombreCategoria,
    ]);
  }

  redirectWithCategoryData(categoryData: any): void {}

  obtenerListadoCategori(id: number) {
    this.materialService.getListarMaterial(id).subscribe({
      next: (data) => {
        this.data = data;
        const dataWithoutArchivo = data.map((item: any) => {
          const { archivo, ...itemWithoutArchivo } = item;
          return itemWithoutArchivo;
        });

        this.dataSource = new MatTableDataSource(dataWithoutArchivo);
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }

  holitas() {
  }
}
