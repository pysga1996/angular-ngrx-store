import * as fromUser from '../store/user';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable} from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable()
// @ts-ignore
export class UserEffects {
  constructor(private actions: Actions, private userService: UserService) { }

  @Effect()
    // @ts-ignore
  login$ = this.actions.pipe(
    ofType<fromUser.Login>(fromUser.EUserActions.LOGIN),
    switchMap(action => {
      const { email, password } = action.payload;
      return this.userService.login(email, password).pipe(
        map(res => new fromUser.LoginSuccess(email)),
        catchError(e => of(new fromUser.LoginFail()))
      );
    })
  );
}
