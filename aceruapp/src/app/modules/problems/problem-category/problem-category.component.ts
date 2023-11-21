import { TokenService } from 'src/app/modules/auth/services/token.service';
import { Component, OnInit } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DATA_CATEGORY_PROBLEMS } from 'src/app/shared/constants/constants-problems';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-service';

@Component({
  selector: 'app-problem-category',
  templateUrl: './problem-category.component.html',
  styleUrls: ['./problem-category.component.less'],
})
export class ProblemCategoryComponent implements OnInit {
  
  faSearch = faSearch;
  faTimes = faTimes;
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

  clearSearch() {}

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page, parameter);
  }
  

  redireccionarNuevaCategoria(){
    this.dataService.clearData()
    this.router.navigate(['problems/new-category']);
  }


  redirectWithCategoryData(categoryData: any): void {
    this.dataService.clearData()
    this.dataService.setData(categoryData);
    this.router.navigate(['problems/new-category']);
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
