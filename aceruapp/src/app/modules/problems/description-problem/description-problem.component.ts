import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CodeWindowComponent } from 'src/app/shared/components/code-window/code-window.component';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';
import { EXERCISES } from 'src/app/shared/constants/constants-submissions';
import { DataService } from 'src/app/shared/services/data-service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { TokenService } from '../../auth/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { ProblemaService } from '../services/problema.service';

@Component({
  selector: 'app-description-problem',
  templateUrl: './description-problem.component.html',
  styleUrls: ['./description-problem.component.less', './description-problem.component2.less'],
})
export class DescriptionProblemComponent implements OnInit {
 
  faSearch = faSearch;
  faTimes = faTimes;
  idCategory: any;
  idProblem: any;
  dataProblema: any;

  constructor(
    private serviceNavigation: NavigationService,
    private route: ActivatedRoute,
    private dataservice: DataService<any>,
    private router: Router,
    private autoservice: TokenService,
    private toster: ToastrService,
    private problemaService: ProblemaService
  ) {}

  ngOnInit() {

    this.dataProblema = this.dataservice.getData();
    this.route.paramMap.subscribe(({ params }: any) => {
      this.idCategory = params.idCategory;
      this.idProblem = params.idProblem;
    });
  }
  clearSearch() {}

  redirect(page: string, parameter?: any) {
    this.serviceNavigation.redirect(page + this.idCategory, parameter);
  }

  openConsol() {
    const userName = this.autoservice.getUserName();
    const authorities = this.autoservice.getAuthorities();
  
    if (userName === null) {
      this.toster.error('Debes iniciar sesión para resolver el problema.');
      return;
    }
  
    if (authorities === null) {
      this.toster.error('No se pudo determinar tu rol. Por favor, vuelve a iniciar sesión.');
      return;
    }
  
    if (authorities.includes('ROLE_ADMIN')) {
      this.toster.error('Los administradores no pueden resolver el problema.');
      return;
    }
  
    this.problemaService.existsByUsuarioIdAndProblemaId(userName, this.idProblem).subscribe({
      next: (existe) => {
        if (existe) {
          this.toster.warning('Ya observaste la solución.'); 
          window.location.href = 'https://github.com/ACERU/SolucionesProblemas';
        } else {
          this.problemaService.insertProblema(userName, this.idProblem).subscribe({
            next: (data) => {
              this.toster.info('Te has inscrito para resolver el problema correctamente.');
            },
            error: (error) => {
              this.toster.error('Ocurrió un error en la operación. Por favor, inténtalo de nuevo más tarde.');
            }
          });
        }
      },
      error: (error) => {
        this.toster.error('Ocurrió un error en la operación. Por favor, inténtalo de nuevo más tarde.');
        console.log("ERROR:", error)
      }
    });
  }
  

  retornar(){
    this.router.navigate(['/problems/category/'+this.idCategory+'/'+this.dataProblema.categoria.nombre]);
  }

}
