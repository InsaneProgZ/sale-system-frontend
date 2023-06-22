import { Component } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Router } from '@angular/router';
import { Product } from './product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {

  constructor(private productService: ProductService, private router: Router) { }

  product: Product = {
    name: '',
    buy_price: null!,
    sell_price: null!,
    brand: ''
  }

  createProduct(): void {
    console.log(this.product)
    this.product.buy_price = Number(this.product.buy_price)
    this.product.sell_price = Number(this.product.sell_price)
    console.log(typeof this.product.buy_price)
    this.productService.createProduct(this.product).subscribe(() => {
      this.productService.showCreateProductMessage("Product created with success!")
      this.router.navigate(['/products'])
    })

  }

}
