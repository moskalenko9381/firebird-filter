import { AddressBlock } from "../blocks/AddressBlock";
import { IAddressData, ICompanyData } from "../../types/type";
import { CompanyBlock } from "../blocks/CompanyBlock";
import React from "react";
import { ModalWindowContainer } from "./ModalWindowContainer";
interface IUserWindowProps {
  address: IAddressData;
  company: ICompanyData;
  username: string;
  onClose(e: React.MouseEvent): void;
}
export const UserModalWindow = (props: IUserWindowProps) => {
    const { address, company, onClose, username } = props;
    return (
        <ModalWindowContainer
            onClose={onClose}
            title={"User " + username + " Information"}
        >
            <AddressBlock address={address} />
            <CompanyBlock company={company} />
        </ModalWindowContainer>
    );
};
