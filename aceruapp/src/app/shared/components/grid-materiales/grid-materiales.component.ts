import { Component,EventEmitter,Input,Output } from '@angular/core';
import swall from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { CategoriaService } from 'src/app/modules/materials/services/categoria.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';

@Component({
  selector: 'app-grid-materiales',
  templateUrl: './grid-materiales.component.html',
  styleUrls: ['./grid.component.less' ]
})
export class GridMaterialesComponent {

  @Input() data: any;

  @Output() eventEmmiter = new EventEmitter();

  actions = [
    { value: 'assets/images/crud/lapiz.png', event: 'edit' },
    { value: 'assets/images/crud/eliminar.png', event: 'delete' },
  ];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private dataservice: DataService<any>,
    public tokenService: TokenService

    ) { }

    sendEvent(event: any) {
      console.log('event ', event);
      this.eventEmmiter.emit(event);
    }

    handleCardClick(item: any) {
      console.log("DATA: ", item)
      if(item.tipoMaterial == null ){
        this.router.navigate(['/materials/category/'+item.id+'/'+item.nombre])
      }
      else{

        this.dataservice.clearData();
        //this.dataservice.setData(item);
        //console.log("DATA a presentacion: "+ item)
        this.router.navigate(['/materials/category/presentation-material/'+item.material.id+'/'+item.id])
      }
    }

    handleAction(event: Event, action: any, item: any) {
      if (action.event === 'edit') {
        this.sendEvent(item);
      } else if (action.event === 'delete') {
        event.stopPropagation();
        swall
          .fire({
            html: `¿Estás seguro que deseas desabilitar :  <strong>${item.nombre}?</strong>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'cancelar',
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.categoriaService
                .cambiarEstadoCategoria(item.id, 'Inactivo')
                .subscribe({
                  next: () => {
                    swall.fire(
                      'Desabilitado!',
                      'Se a desabilitado la categoria correctamente',
                      'success'
                    );

                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigate(['/materials'], {
                      relativeTo: this.route,
                    });
                  },
                  error: () => {
                    swall.fire(
                      'Desabilitado',
                      'No se pudo inabilitar la categoria',
                      'warning'
                    );
                  },
                });
            }
          });
      }
    }
}
