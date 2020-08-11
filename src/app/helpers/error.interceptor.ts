import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store';
import * as fromUser from '../store/user';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromRoot.IAppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.store.dispatch(new fromUser.Logout());
        location.reload(true);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
