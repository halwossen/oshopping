import {Observable} from 'rxjs';
import { AppUser } from '../../shared/models/app.user';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(): Observable<boolean> {
     return this.auth.appUser$.pipe(
       map((appUser: AppUser) => appUser.isAdmin)
       );
      }
}
