import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MainSectionComponent } from './main-section/main-section.component';
import { HomeComponent } from './home.component';
import { ListBtnResourcesModule } from 'src/app/shared/components/list-btn-resources/list-btn-resources.module';
import { ResourcesModule } from 'src/app/shared/components/resources/resources.module';
import { NewsModule } from 'src/app/shared/components/news/news.module';
import { AboutModule } from '../../shared/components/about/about.module';




@NgModule({
  declarations: [HomeComponent,MainSectionComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ListBtnResourcesModule,
    ResourcesModule,
    NewsModule,
    AboutModule
  ]
})
export class HomeModule { }
