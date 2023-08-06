import { ICompanyData } from "../../types/type";

interface IProps {
  company: ICompanyData;
}

export const CompanyBlock = (props: IProps) => {
    const { company } = props;
    return (
        <div>
            <h4> Company </h4>
            {company.name} ({company.bs})
            <br />
            <p className="company-catchphrase"> {company.catchPhrase} </p>
        </div>
    );
};
