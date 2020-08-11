import * as fromUser from './user';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  user: fromUser.IUserState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  user: fromUser.userReducer
};
