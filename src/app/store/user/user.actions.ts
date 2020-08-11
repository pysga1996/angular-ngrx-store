import { Action } from '@ngrx/store';

export enum EUserActions {
  LOGIN = '[USER] Login',
  LOGIN_SUCCESS = '[USER] Login Success',
  LOGIN_FAIL = '[USER] Login Fail'
}

export class Login implements Action {
  public readonly type = EUserActions.LOGIN;
  constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccess implements Action {
  public readonly type = EUserActions.LOGIN_SUCCESS;
  constructor(public payload: string) { }
}

export class LoginFail implements Action {
  public readonly type = EUserActions.LOGIN_FAIL;
  constructor() { }
}

export type UserActions = Login | LoginSuccess | LoginFail;
