import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/config";
import React, {
    ChangeEvent,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    deleteUserAction,
    openUserAction,
    resetDeletedUsersAction,
} from "../redux/usersReducer";
import { UserComponent } from "./User";
import { useDebounce } from "../functions/hooks";
import { UserModalWindow } from "./modal/UserModalWindow";
import { HelpButtons } from "./HelpButtons";
import { NoResultBlock } from "./blocks/NoResultBlock";

export const UsersList = () => {
    const dispatch = useDispatch();
    const { usersList, opened } = useSelector((state: RootState) => state.users);
    const [filteredList, setFilteredList] = useState(usersList);
    const [filter, setFilter] = useState("");

    const onReset = useCallback(() => {
        setFilteredList(usersList);
        setFilter("");
        dispatch(resetDeletedUsersAction());
    }, [usersList]);

    const onDeleteUser = (username: string) => {
        dispatch(deleteUserAction(username));
    };

    const onOpenUser = (username?: string) => {
        dispatch(openUserAction(username));
    };

    const setFilteredListFunc = useCallback(
        (value: string) => {
            setFilteredList(
                usersList.filter(
                    (item) =>
                        item.name.toLowerCase().includes(value) ||
            item.username.toLowerCase().includes(value) ||
            item.email.toLowerCase().includes(value)
                )
            );
        },
        [usersList]
    );

    const setDebouncedFilteredList = useDebounce(setFilteredListFunc);
    const onFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setFilter(event.target.value);
        setDebouncedFilteredList(value);
    };

    const openedUser = useMemo(() => {
        if (!opened) {
            return undefined;
        }
        const openedUserData = filteredList.filter(
            (item) => item.username === opened
        );
        if (openedUserData.length) {
            return openedUserData[0];
        }
        return undefined;
    }, [opened, filteredList]);

    const onClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenUser(undefined);
    };

    return (
        <div className="main-block">
            <HelpButtons filter={filter} onFilter={onFilter} onReset={onReset} />
            <ul>
                {filteredList.map((user) => {
                    if (user.isDeleted) {
                        return undefined;
                    }
                    return (
                        <UserComponent
                            key={user.username}
                            user={user}
                            filter={filter}
                            onDelete={onDeleteUser}
                            opened={opened === user.username}
                            setOpened={onOpenUser}
                        />
                    );
                })}
            </ul>
            {filteredList.length ? undefined : <NoResultBlock />}
            {openedUser && (
                <UserModalWindow
                    username={openedUser.username}
                    address={openedUser.address}
                    company={openedUser.company}
                    onClose={onClose}
                />
            )}
        </div>
    );
};
