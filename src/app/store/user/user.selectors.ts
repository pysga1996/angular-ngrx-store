import {createSelector, Selector} from '@ngrx/store';
import {IUserState} from './user.states';
import {IAppState} from '../index';

export const selectLogin: Selector<IAppState, IUserState> = (state: IAppState) => state.user;

export const getLoadingLogin = createSelector(
  selectLogin,
  (state: IUserState) => state.login.loading
);

export const getSuccessLogin = createSelector(
  selectLogin,
  (state: IUserState) => state.login.success
);

export const getFailLogin = createSelector(
  selectLogin,
  (state: IUserState) => state.login.fail
);
