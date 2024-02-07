import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [{
  path: '', component: ProductsComponent, pathMatch: 'full'
}]

@NgModule({
  declarations: [
    ProductsComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductsModule { }
