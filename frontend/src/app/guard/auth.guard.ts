import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  usersService: UsersService;
  router: Router;

  constructor(usersService: UsersService, router: Router) {
    this.usersService = usersService;
    this.router = router;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.url.join('') === 'basket'){
      if (this.usersService.getUserRole() === ''){
        this.router.navigate(['/page-not-found']);
        return false;
      }
      else {
        return true;
      }
    }
    else if (route.url.join('') === 'trip-form'){
      if (this.usersService.getUserRole() !== 'admin' && this.usersService.getUserRole() !== 'worker'){
        this.router.navigate(['/page-not-found']);
        return false;
      }
      else {
        return true;
      }
    }
    else if (route.url.join('') === 'configuration'){
      if (this.usersService.getUserRole() !== 'admin'){
        this.router.navigate(['/page-not-found']);
        return false;
      }
      else {
        return true;
      }
    }
  }
}
