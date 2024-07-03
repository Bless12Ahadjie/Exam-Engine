import { PartialStateUpdater } from '@ngrx/signals';
import { IUserState } from './user.interface';
import { produce } from 'immer';

export function setUserDetails(
  payloadUserState: IUserState
): PartialStateUpdater<IUserState> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.userId = payloadUserState.userId;
      draft.email = payloadUserState.email;
    });
}

export function setUserRole(role: string): PartialStateUpdater<IUserState> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.roles = role;
    });
}

export function setUserId(id: string): PartialStateUpdater<IUserState> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.userId = id;
    });
}

export function setUserEmail(email: string): PartialStateUpdater<IUserState> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.email = email;
    });
}
