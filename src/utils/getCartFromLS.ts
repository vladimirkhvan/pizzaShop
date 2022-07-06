import { TCartItem } from "../redux/slices/cartSlice";
import { getTotalPrice } from "./getTotalPrice";

export const getCartFromLS = () => {
    const cart = localStorage.getItem('cart') as string;

    const items = JSON.parse(cart) as TCartItem[];

    const totalPrice = getTotalPrice(items);

    return {items, totalPrice}
}