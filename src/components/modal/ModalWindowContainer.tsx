interface IProps {
  children: React.ReactNode; //React.ReactElement[];
  onClose(e: React.MouseEvent): void;
  title: string;
}
export const ModalWindowContainer = (props: IProps) => {
    return (
        <div
            id="openModal"
            className="modal"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title">{props.title}</p>
                        <button title="Close" onClick={props.onClose} className="close">
              ×
                        </button>
                    </div>
                    <div className="modal-body">{props.children}</div>
                </div>
            </div>
        </div>
    );
};
