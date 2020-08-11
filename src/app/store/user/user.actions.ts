import { Action } from '@ngrx/store';
import {User} from '../../models/user';

export enum EUserActions {
  LOGIN = '[USER] Login',
  LOGIN_SUCCESS = '[USER] Login Success',
  LOGIN_FAIL = '[USER] Login Fail',
  LOGOUT = '[USER] Logout'
}

export class Login implements Action {
  public readonly type = EUserActions.LOGIN;
  constructor(public payload: { email: string, password: string, returnUrl?: string }) { }
}

export class LoginSuccess implements Action {
  public readonly type = EUserActions.LOGIN_SUCCESS;
  constructor(public payload: User, public returnUrl: string) { }
}

export class LoginFail implements Action {
  public readonly type = EUserActions.LOGIN_FAIL;
  constructor() { }
}

export class Logout implements Action {
  public readonly type = EUserActions.LOGOUT;
  constructor() { }
}

export type UserActions = Login | LoginSuccess | LoginFail | Logout;
