import { TCartItem } from "../redux/slices/cartSlice";

export const getTotalPrice = (items: TCartItem[])=>{
    return items.reduce(
        (sum, current) => sum + current.price * current.count,
        0,
    );
}