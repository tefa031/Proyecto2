import { Component,EventEmitter,Input,Output } from '@angular/core';
import swall from 'sweetalert2';
import { CategoriaService } from 'src/app/modules/problems/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/modules/auth/services/token.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less'],
})
export class GridComponent {
  
  @Input() data: any;

  actions = [
    { value: 'assets/images/crud/lapiz.png', event: 'edit' },
    { value: 'assets/images/crud/eliminar.png', event: 'delete' },
  ];

  @Output() eventEmmiter = new EventEmitter();

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    public tokenService: TokenService
    ) { }


  sendEvent(event: any) {
    console.log('event ', event);
    this.eventEmmiter.emit(event);
  }

  handleCardClick(item: any) {
    this.router.navigate(['/problems/category/'+item.id+'/'+item.nombre])
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
                  this.router.navigate(['/problems'], {
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
