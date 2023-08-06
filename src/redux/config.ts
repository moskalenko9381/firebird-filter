import { combineReducers, createStore, Store } from "redux";
import { usersListReducer } from "./usersReducer";
import { getUsers } from "../api/users";
import { IUserData } from "../types/type";

const reducers = combineReducers({
    users: usersListReducer,
});

export default reducers;

export const configureStoreAsync = (): Promise<Store> => {
    let initialState = { users: { usersList: [] as IUserData[] } };
    return new Promise((resolve) => {
        getUsers()
            .then((data: IUserData[]) => {
                return data;
            })
            .then((list) => {
                initialState = { users: { usersList: list} };
            })
            .catch((error: Error) => {
                console.error("Error occured:", error);
            })
            .finally(() => {
                const store = createStore(reducers, initialState);
                resolve(store);
            });
    });
};
export type RootState = { users: { usersList: IUserData[]; opened?: string } }; //Awaited<ReturnType<typeof configureStoreAsync>>;
