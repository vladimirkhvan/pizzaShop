import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { getTotalPrice } from '../../utils/getTotalPrice';

export type TCartItem = {
    id: string;
    title: string;
    image: string;
    type: string;
    size: number;
    price: number;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    items: TCartItem[];
}

const {totalPrice, items} = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<TCartItem>) {
            const obj = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.type === action.payload.type &&
                    item.size === action.payload.size,
            );

            if (obj) {
                obj.count++;
            } else {
                state.items.push(action.payload);
            }

            state.totalPrice = getTotalPrice(state.items);
        },
        removeOneItem(state, action: PayloadAction<TCartItem>) {
            const obj = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.type === action.payload.type &&
                    item.size === action.payload.size,
            );
            if (obj.count > 1) {
                obj.count--;
                state.totalPrice = state.items.reduce(
                    (sum, current) => sum + current.price * current.count,
                    0,
                );
            }
        },
        removeItem(state, action: PayloadAction<TCartItem>) {
            state.items = state.items.filter(
                (item) =>
                    item.id !== action.payload.id ||
                    item.type !== action.payload.type ||
                    item.size !== action.payload.size,
            );

            state.totalPrice = state.items.reduce(
                (sum, current) => sum + current.price * current.count,
                0,
            );
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, removeOneItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
