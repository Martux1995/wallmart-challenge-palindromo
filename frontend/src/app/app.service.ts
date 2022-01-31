import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductsResponse } from './app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getProducts(name:string,filters:{page:number, size:number}) {
    const { page, size } = filters;

    return this.http.get<ProductsResponse>(
      `${environment.url}/products?q=${name}${page ? "&page=" + page : ''}${size ? "&limit=" + size : ''}`
    );
  }
}
