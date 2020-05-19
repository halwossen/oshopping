import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(auth: AuthService, userService: UserService, router: Router) {
    auth.user$.subscribe(user => {
      // tslint:disable-next-line: curly
      if (!user) return;

      userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      // tslint:disable-next-line: curly
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
