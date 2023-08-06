export interface IUserData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  isDeleted: boolean;
  address: IAddressData;
  company: ICompanyData;
}

export interface ICompanyData {
  bs: string;
  catchPhrase: string;
  name: string;
}

interface ILatLng {
  lat: number;
  lng: number;
}

export interface IAddressData {
  city: string;
  geo: ILatLng;
  street: string;
  suite: string;
  zipcode: string;
}
