export interface AddressType {
  id: string;
  name: string;
  mobileNumber: string;
  state: string;
  city: string;
  pincode: string;
  Address1: string;
  Address2?: string;
  Landmark: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface AddAddress {
  name: string;
  mobileNumber: string;
  state: string;
  pincode: string;
  city: string;
  address1: string;
  address2?: string;
  landmark: string;
  userId: string;
}
