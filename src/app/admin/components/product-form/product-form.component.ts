import { Product } from '../../../shared/models/product';
import { take } from 'rxjs/operators';
import { ProductService } from '../../../shared/services/product.service';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../shared/services/category.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$: Observable<any[]>;
  product: Product = {} as Product;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
      this.categories$ = this.categoryService.getAll();

      this.id = route.snapshot.paramMap.get('id');
      if (this.id) {
        this.productService.get(this.id).pipe(
          take(1)).subscribe((prod: Product) => this.product = prod);
        }
    }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.createProduct(product);
    }

    this.router.navigate(['/admin/products']);
    }

    delete() {
      // tslint:disable-next-line: curly
      if (!confirm('Are you sure you want to delete this?')) return;

      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
}
