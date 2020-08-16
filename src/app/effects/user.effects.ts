import * as fromUser from '../store/user';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable} from '@angular/core';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Injectable()
// @ts-ignore
export class UserEffects {
  constructor(private actions$: Actions, private authenticationService: AuthenticationService,
              private router: Router) { }

  @Effect()
    // @ts-ignore
  login$ = this.actions$.pipe(
    ofType<fromUser.Login>(fromUser.EUserActions.LOGIN),
    switchMap(action => {
      const { email, password, returnUrl } = action.payload;
      return this.authenticationService.login(email, password).pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate([returnUrl]);
          return new fromUser.LoginSuccess(user, returnUrl);
        }),
        catchError(error => {
          console.log(error);
          return of(new fromUser.LoginFail());
        })
      );
    })
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<fromUser.Logout>(fromUser.EUserActions.LOGOUT),
    tap(() => {
      console.log('log out!');
      localStorage.removeItem('currentUser');
      this.router.navigate(['login']);
    })
  );
}
