import { IUserData } from "../types/type";
import { useCallback, useMemo, useState } from "react";
import { getIndexes } from "../functions/users";
import { DeleteButton } from "./DeleteButton";
import { DeleteModalWindow } from "./modal/DeleteModalWindow";

interface IUserProps {
  user: IUserData;
  filter: string;

  onDelete(username: string): void;

  setOpened(username?: string): void;

  opened?: boolean;
}

export const getHighLightedString = (
    source: string,
    occurenceIndexes: number[],
    substringLength: number
) => {
    const spansArray = [];
    if (occurenceIndexes[0] !== 0) {
        spansArray.push(
            <span className="not-highlighted" key={source + "00"}>
                {source.slice(0, occurenceIndexes[0])}
            </span>
        );
    }

    for (let i = 0; i < occurenceIndexes.length; i++) {
        spansArray.push(
            <span className="highlighted" key={source + i}>
                {source.slice(
                    occurenceIndexes[i],
                    occurenceIndexes[i] + substringLength
                )}
            </span>
        );
        if (
            occurenceIndexes[i] + substringLength !== source.length &&
      occurenceIndexes[i] + substringLength !== occurenceIndexes[i + 1]
        ) {
            spansArray.push(
                <span className="not-highlighted" key={source + i + "end"}>
                    {source.slice(
                        occurenceIndexes[i] + substringLength,
                        occurenceIndexes[i + 1]
                    )}
                </span>
            );
        }
    }
    return spansArray;
};
export const UserComponent = (props: IUserProps) => {
    const { user, filter, onDelete, opened, setOpened } = props;

    const [showDeleteWindow, setShowDeleteWindow] = useState(false);

    const { emailIndexes, nameIndexes, userNameIndexes } = useMemo(() => {
        if (!filter.length) {
            return { emailIndexes: [], userNameIndexes: [], nameIndexes: [] };
        }
        const lowerCaseFilter = filter.toLowerCase();
        const emailIndexes: number[] = getIndexes(
            user.email.toLowerCase(),
            lowerCaseFilter
        );
        const nameIndexes = getIndexes(user.name.toLowerCase(), lowerCaseFilter);
        const userNameIndexes = getIndexes(
            user.username.toLowerCase(),
            lowerCaseFilter
        );
        return { emailIndexes, userNameIndexes, nameIndexes };
    }, [user, filter]);

    const onClick = useCallback(() => {
        setOpened(user.username);
    }, [setOpened]);

    const eventStopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const onDeleteClick = (e: React.MouseEvent) => {
        eventStopPropagation(e);
        setShowDeleteWindow(true);
    };

    const onCancelClick = (e: React.MouseEvent) => {
        eventStopPropagation(e);
        setShowDeleteWindow(false);
    };

    return (
        <li key={user.username} onClick={onClick}>
            <div className="spans-container">
                <div>
                    {getHighLightedString(user.email, emailIndexes, filter.length)}
                </div>
                <div>{getHighLightedString(user.name, nameIndexes, filter.length)}</div>
                <div>
                    {getHighLightedString(user.username, userNameIndexes, filter.length)}
                </div>
            </div>
            <div className="delete-button-container">
                <DeleteButton
                    key={user.username}
                    onClick={onDeleteClick}
                />

                {showDeleteWindow ? (
                    <DeleteModalWindow
                        onDelete={() => {
                            onDelete(user.username);
                            setShowDeleteWindow(false);
                        }}
                        onClose={onCancelClick}
                        username={user.username}
                    />
                ) : undefined}
            </div>
        </li>
    );
};
