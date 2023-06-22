import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../products/product-create/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:8080/products'

  showCreateProductMessage(msg: string): void {

    this.snackBar.open(msg, 'ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      
    })
  }

  createProduct(product: Product): Observable<Product> {
    console.log('TEST client http')
    return this.httpClient.post<Product>(this.baseUrl, product)
  }

  searchAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl)
  }
}
