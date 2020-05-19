import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';
import { ShippingDetail } from 'shared/models/shipping-detail';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = new ShippingDetail();
  userSubscription: Subscription;
  userId: string;


  constructor(
    private router: Router,
    private orderService: OrderService,
    private auth: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.user$.subscribe(user => this.userId = user.uid);

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/', result.key]);
  }

}
