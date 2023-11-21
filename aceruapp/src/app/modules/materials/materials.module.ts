import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsComponent } from './materials.component';
import { MaterialsRoutingModule } from './materials-routing.module';
import { GridModule } from 'src/app/shared/components/grid/grid.module';
import { MaterialsCategoryComponent } from './materials-category/materials-category.component';
import { ListMaterialsComponent } from './list-materials/list-materials.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { MaterialPresentationComponent } from './material-presentation/material-presentation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCategoryComponent } from './new-category/new-category.component';
import { MaterialModule } from '../material/material.module';
import { GridMaterialesComponent } from 'src/app/shared/components/grid-materiales/grid-materiales.component';
import { GridMaterialesModule } from 'src/app/shared/components/grid-materiales/grid-materiales.module';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { GridListMaterialesComponent } from 'src/app/shared/components/grid-list-materiales/grid-list-materiales.component';
import { GridListMaterialesModule } from 'src/app/shared/components/grid-list-materiales/grid-list-materiales.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    MaterialModule,
    FormsModule,
    GridMaterialesModule,
    NgxDocViewerModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    GridListMaterialesModule


  ],
  declarations: [MaterialsComponent, MaterialsCategoryComponent, ListMaterialsComponent, NewMaterialComponent, MaterialPresentationComponent, NewCategoryComponent]
})
export class MaterialsModule { }
