import {IUserLoginState, IUserState} from './user.states';
import {EUserActions, UserActions} from './user.actions';

const initLoginState: IUserLoginState = {
  loading: false,
  success: false,
  fail: false,
  userName: ''
};

const initUserState: IUserState = {
  login: initLoginState,
  userInfo: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
};

export function userReducer(state = initUserState, action: UserActions): IUserState {
  switch (action.type) {
    case EUserActions.LOGIN:
      return {
        ...state,
        login: { ...initLoginState, loading: true}
      };
    case EUserActions.LOGIN_SUCCESS:
      return {
        ...state,
        login: { ...state.login, loading: false, success: true, userName: action.payload.username  },
        userInfo: action.payload
      };
    case EUserActions.LOGIN_FAIL:
      return {
        ...state,
        login: { ...state.login, loading: false, fail: true }
      };
    case EUserActions.LOGOUT:
      return {
        ...initUserState
      };
    default:
      return state;
  }
}
