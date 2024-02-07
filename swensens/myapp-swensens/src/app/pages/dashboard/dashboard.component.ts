import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Datum } from '../../model/products';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  productList: Datum[] = [];
  filteredProductList: Datum[] = [];
  constructor(
    private apiService: ApiService
  ){}

  ngOnInit(){
    this.getProduct();
    this.filteredProductList = this.productList;
  }

  filterProductsByCategory(category: string) {
    this.filteredProductList = this.productList.filter(product => product.category === category);
  }

  getProduct(){
    this.apiService.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data
        this.filteredProductList = this.productList
      }, error(err) {
        console.log(err)
      }
    });
  };
}
