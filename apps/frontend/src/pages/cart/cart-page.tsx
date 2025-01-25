import { CartItemType } from "@/types/cart-item-type";

const Cart = () => {
  const products: CartItemType[] = [
    {
      id: "cm6afwn1w0001kbehm1dhhjm3",
      quantity: 1,
      price: 379,
      productId: "cm64qpfsa0000kben75886gjx",
      cartId: "cm69fv3420001kb4q2y60t7bi",
    },
    {
      id: "cm6afy85d0001kbm49n8shab7",
      quantity: 1,
      price: 379,
      productId: "cm64rh3dg0004kbmtdtz4f34y",
      cartId: "cm69fv3420001kb4q2y60t7bi",
    },
  ];

  return (
    <div className="pt-20 px-24">
      <div className="pt-10 text-3xl font-semibold">Shopping Cart</div>
      <div className="flex flex-col pt-10">
        {products?.length > 0 &&
          products.map(({ id }) => {
            return <div key={id}>{id}</div>;
          })}
      </div>
    </div>
  );
};

export default Cart;
