import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import * as fromUser from '../store/user';
import {first, takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store';

@Injectable()
// @ts-ignore
export class JwtInterceptor implements HttpInterceptor {

  currentUser: User;

  constructor(private store: Store<fromRoot.IAppState>) {
    this.store.select(fromUser.getUserInfo).subscribe(user => {
      this.currentUser = user;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.currentUser && this.currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
