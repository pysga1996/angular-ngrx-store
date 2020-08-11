import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store';
import {User} from '../models/user';
import * as fromUser from '../store/user';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AuthGuard implements CanActivate {

  currentUser: User;

  constructor(
    private router: Router,
    private store: Store<fromRoot.IAppState>
  ) {
    this.store.select(fromUser.getUserInfo).subscribe(user => {
      this.currentUser = user;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
