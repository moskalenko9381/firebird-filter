import deleteImg from "../images/delete.svg";
interface IProps {
  onClick(e: React.MouseEvent): void;
}
export const DeleteButton = (props: IProps) => {
    return (
        <button onClick={props.onClick}>
            <img src={deleteImg} width={40} height={40} />{" "}
        </button>
    );
};
