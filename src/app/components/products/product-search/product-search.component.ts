import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product-create/product.model';
import { ProductService } from '../../product/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductSearchDataSource } from './product-search-datasource';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})

export class ProductSearchComponent implements AfterViewInit {

  constructor(private productService: ProductService) {
    this.dataSource = new ProductSearchDataSource();
  }
  displayedColumns = ['code', 'name', 'buy_price', 'sell_price', 'brand', 'creation_date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductSearchDataSource;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  async ngOnInit(): Promise<void> {
    this.productService.searchAllProducts().subscribe(products => {
      products.forEach( product => 
        product.creation_date = new Date(product.creation_date!).toLocaleString())
      this.dataSource.data = products
      console.log(this.dataSource.data)
    }
    )
  }
}