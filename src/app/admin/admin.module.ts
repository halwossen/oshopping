import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthGaurd } from './../shared/services/auth-gaurd.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([

      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGaurd, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGaurd, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGaurd, AdminAuthGuard]
      },

      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGaurd, AdminAuthGuard]
      }
    ]),
  ]
})
export class AdminModule { }
