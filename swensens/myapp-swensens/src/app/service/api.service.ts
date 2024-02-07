import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Datum, Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //API Products
  getProducts(): Observable<Products>{
    return this.http.get<Products>(`${environment.apiUrl}/products`);
  }
}
