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
