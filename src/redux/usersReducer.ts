import { IUserData } from "../types/type";

export interface IUserState {
  usersList: IUserData[];
  opened?: string;
}

const DEFAULT_STATE: IUserState = { usersList: [] };

export interface ISetUsersListAction {
  type: "SET_USERS_LIST";
  usersList: IUserData[];
}

export const setUsersListAction = (
    usersList: IUserData[]
): ISetUsersListAction => {
    return {
        type: "SET_USERS_LIST",
        usersList,
    };
};

export interface IResetDeletedUsersAction {
  type: "RESET_DELETED_USERS";
}

export const resetDeletedUsersAction = (): IResetDeletedUsersAction => {
    return {
        type: "RESET_DELETED_USERS",
    };
};

export interface IDeleteUserAction {
  type: "DELETE_USER";
  username: string;
}

export const deleteUserAction = (username: string): IDeleteUserAction => {
    return {
        type: "DELETE_USER",
        username,
    };
};

export interface IOpenUserAction {
  type: "OPEN_USER";
  username?: string;
}

export const openUserAction = (username?: string): IOpenUserAction => {
    return {
        type: "OPEN_USER",
        username,
    };
};

export function usersListReducer(
    state: IUserState = DEFAULT_STATE,
    action:
    | ISetUsersListAction
    | IDeleteUserAction
    | IResetDeletedUsersAction
    | IOpenUserAction
): IUserState {
    switch (action.type) {
    case "SET_USERS_LIST":
        return { ...state, usersList: action.usersList };
    case "DELETE_USER":
        const deletedUser = state.usersList.filter(
            (item) => item.username === action.username
        );
        if (deletedUser.length) {
            deletedUser[0].isDeleted = true;
        }
        return { ...state, usersList: [...state.usersList] };
    case "RESET_DELETED_USERS":
        state.usersList.forEach((item) => (item.isDeleted = false));
        return { ...state, usersList: [...state.usersList] };
    case "OPEN_USER":
        return { ...state, opened: action.username };
    default:
        return state;
    }
}
