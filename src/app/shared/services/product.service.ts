import { map } from 'rxjs/operators';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('products').snapshotChanges()
      .pipe(
        map(products => products.map((snap: SnapshotAction<any>) => {
          const payload = snap.payload.val();
          const key = snap.key;
          return {key, ...payload};
        }))
      );
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(prodId) {
    this.db.object('/products/' + prodId).remove();
  }
}
