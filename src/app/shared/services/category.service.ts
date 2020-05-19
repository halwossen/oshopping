import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Observable<any>;

  constructor(
    private db: AngularFireDatabase, private afs: AngularFirestore) { }

  getAll() {
    this.categories = this.db.list('/categories').snapshotChanges()
      .pipe(
        map(category => category.map((snap: SnapshotAction<any>) => {
          const payload = snap.payload.val();
          const key = snap.key;
          return {key, ...payload};

        })));
    return this.categories;
  }
}


