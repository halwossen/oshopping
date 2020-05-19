import { Product } from '../../../shared/models/product';
import {Subscription } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnDestroy, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  products: Product[];
  subscription: Subscription;
  tableResource: MatTableDataSource<Product>;
  displayedColumns = ['title', 'price', 'edit'];

  constructor(private productServic: ProductService) {}

  ngAfterViewInit() {
    this.subscription = this.productServic.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new MatTableDataSource(products);

    this.tableResource.paginator = this.paginator;
    this.tableResource.sort = this.sort;
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    let filteredProducts = (filterValue) ?
      this.products.filter(p => p.title.toLocaleLowerCase().includes(filterValue)) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
