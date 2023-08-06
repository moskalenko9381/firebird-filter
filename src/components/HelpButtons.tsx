import React from "react";
import "./styles.scss";
interface IProps {
  filter: string;
  onFilter: React.ChangeEventHandler;
  onReset(): void;
}
export const HelpButtons = (props: IProps) => {
    const { filter, onFilter, onReset } = props;
    return (
        <div className="help-buttons">
            <div>
                <label> Filter </label>
                <input type="text" value={filter} onChange={onFilter} />
            </div>
            <button onClick={onReset} disabled={!filter.length}>
             Reset
            </button>
        </div>
    );
};
