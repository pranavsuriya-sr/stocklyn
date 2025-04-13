import { OrderItemType } from "./order-item-type";

export interface OrderType {
  id: String;
  total: Number;
  createdAt: Date;
  userId: String;
  OrderItems: OrderItemType[];
}
