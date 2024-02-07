import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Datum, Products } from '../../model/products';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Datum[] = [];
  constructor(private http: HttpClient, private dialog: MatDialog){

  }

  ngOnInit(){
    this.getProducts();
  }

  getProducts() {
    this.http.get<Products>(`${environment.apiUrl}/products`).subscribe({
      next: (res) => {
        this.products = res.data;
      }
    });
  }

  addProducts(){
    this.dialog.open(AddComponent);
  }

  editProducts(data: any){
    this.dialog.open(EditComponent,{data});
  }

  deleteProducts(data: any){
    const result = confirm("Are you sure Delete?")
    if(result){
      this.http.delete(`${environment.apiUrl}/products/${data.id}`)
      .subscribe({
        next: (res) =>{
          location.reload();
        }
      });
    }
  }
}
