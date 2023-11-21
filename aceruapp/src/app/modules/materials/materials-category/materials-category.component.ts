import { Component, OnInit } from '@angular/core';
import { DATA_CATEGORY_PROBLEMS } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Categoria } from '../../problems/model/categoria';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';
import { CategoriaService } from '../services/categoria.service';
import { TokenService } from '../../auth/services/token.service';

@Component({
  selector: 'app-materials-category',
  templateUrl: './materials-category.component.html',
  styleUrls: ['./materials-category.component.less']
})
export class MaterialsCategoryComponent implements OnInit {

  data: Categoria[] = [];
  estadoFiltro:any;

  filterText: string = ''; 
  showInactivos = false;

  constructor(
    private serviceNavigation: NavigationService,
    private categoriaService: CategoriaService,
    private router: Router,
    private dataService: DataService<any>,
    public tokenService: TokenService
  ) {}

  ngOnInit() {
    this.obtenerListadoCategori("Activo");
  }

  filtrarCategorias() {
    const filtro = this.filterText.toLowerCase().trim();
    if (filtro === '') {
      this.obtenerListadoCategori("Activo");
    } else {
      this.data = this.data.filter((categoria: any) =>
        categoria.nombre.toLowerCase().includes(filtro)
      );
    }
  }


  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter);
  }

  redireccionarNuevaCategoria(){
    this.dataService.clearData()
    this.router.navigate(['materials/new-category']);
  }

  redirectWithCategoryData(categoryData: any): void {
    this.dataService.clearData()
    this.dataService.setData(categoryData);
    this.router.navigate(['materials/new-category']);
  }

  obtenerListadoCategori(estado: string){
    this.categoriaService.getListarCategoria(estado).subscribe( {
      next: (data) => {
        this.data = data
      },
      error: (err) =>{
        console.log("Error ", err.error)
      }
    })
  }

  mostrarInactivos(){
    if (this.showInactivos) {
      this.obtenerListadoCategori('Activo');
    } else {
      this.obtenerListadoCategori('Inactivo');
    }
  }

}
