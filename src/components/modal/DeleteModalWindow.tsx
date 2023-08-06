import { ModalWindowContainer } from "./ModalWindowContainer";

interface IProps {
  onDelete(): void;
  onClose(e: React.MouseEvent): void;
  username: string;
}
export const DeleteModalWindow = (props: IProps) => {
    const { onDelete, onClose, username } = props;
    return (
        <ModalWindowContainer
            onClose={onClose}
            title={"Delete the user " + username + "?"}
        >
            <div className="delete-container">
                <button onClick={onDelete}> Confirm </button>
                <button onClick={onClose}> Cancel </button>
            </div>
        </ModalWindowContainer>
    );
};
