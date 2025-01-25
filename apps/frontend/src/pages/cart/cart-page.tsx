import { useCartStore } from "@/utils/store/cart-store";

const Cart = () => {
  const { products } = useCartStore();
  const { GetCount } = useCartStore();

  console.log(products);

  return (
    <div className="pt-20 px-24">
      <div className="pt-10 text-3xl font-semibold">Shopping Cart</div>
      {GetCount() > 0 &&
        products.map(({ id }) => {
          return (
            <div className="flex flex-col pt-10" key={id}>
              {id}
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
