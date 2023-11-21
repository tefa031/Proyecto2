import { TokenService } from 'src/app/modules/auth/services/token.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/modules/problems/services/categoria.service';
import { EventEmitter } from '@angular/core';
import { DataService } from '../../services/data-service';


@Component({
  selector: 'app-grid-list-materiales',
  templateUrl: './grid-list-materiales.component.html',
  styleUrls: ['./grid-list-materiales.component.less']
})
export class GridListMaterialesComponent implements OnInit {

  @Input() data: any;

  @Output() eventEmmiter = new EventEmitter();

  actions = [
    { value: 'assets/images/crud/lapiz.png', event: 'edit' },
    { value: 'assets/images/crud/eliminar.png', event: 'delete' },
  ];

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private dataservice: DataService<any>,
    private router: Router,
    public tokenService: TokenService
    ) { }

  ngOnInit(): void {
  }

  handleCardClick(item: any) {
    this.dataservice.clearData();
    this.dataservice.setData(item);
    console.log("DATA a presentacion: "+ item)
    this.router.navigate(['/materials/category/presentation-material/'+item.categoria.id+'/'+item.id])
  }
}
