import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { IUserState } from './user.interface';
import { setUserEmail, setUserId, setUserRole } from './user.actions';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

const initialUserState: IUserState = {} as IUserState;

export const UserStore = signalStore(
  { providedIn: 'root' },
  withDevtools('user'),
  withState(initialUserState),
  withMethods((store) => ({
    setUserRole: (payload: string) => {
      patchState(store, setUserRole(payload));
    },
    setUserId: (payload: string) => {
      patchState(store, setUserId(payload));
    },
    setUserEmail: (payload: string) => {
      patchState(store, setUserEmail(payload));
    },
  }))
);
