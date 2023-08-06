import { IAddressData } from "../../types/type";
import location from "../../images/location.svg";

interface IProps {
  address: IAddressData;
}

export const AddressBlock = (props: IProps) => {
    const { address } = props;
    return (
        <div className="address-block">
            <h4> Address </h4>
            <div>
                {address.city},&nbsp; {address.street}, &nbsp;{address.suite}, &nbsp;
                {address.zipcode}
            </div>
            <div className="location-container">
                <img src={location} width={40} height={40} />
                <p>
                    {address.geo.lat}, {address.geo.lng}
                </p>
            </div>
        </div>
    );
};
