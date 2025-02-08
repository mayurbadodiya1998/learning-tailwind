import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FooterComponent } from '../outlook/footer/footer.component';
import { HeaderComponent } from '../outlook/header/header.component';


@NgModule({
  declarations: [HomeComponent, FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule
  ]
})
export class HomeModule { }
