import {createSelector, Selector} from '@ngrx/store';
import {IUserState} from './user.states';
import {IAppState} from '../index';
import {User} from '../../models/user';


export const selectUser: Selector<IAppState, IUserState> = (state: IAppState) => state.user;

export const getLoadingLogin: Selector<IAppState, boolean> = createSelector(
  selectUser,
  (state: IUserState) => state.login.loading
);

export const getSuccessLogin: Selector<IAppState, boolean> = createSelector(
  selectUser,
  (state: IUserState) => state.login.success
);

export const getFailLogin: Selector<IAppState, boolean> = createSelector(
  selectUser,
  (state: IUserState) => state.login.fail
);

export const getUserInfo: Selector<IAppState, User> = (state: IAppState) => state.user.userInfo;
