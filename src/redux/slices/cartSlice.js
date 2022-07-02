import { createSlice } from '@reduxjs/toolkit';

// {
//      id,
//     title,
//     image,
//     type,
//     size,
//     price,
//      count
// }

const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
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

            state.totalPrice = state.items.reduce(
                (sum, current) => sum + current.price * current.count,
                0,
            );
        },
        removeOneItem(state, action) {
            const obj = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.type === action.payload.type &&
                    item.size === action.payload.size,
            );
            obj.count--;
            state.totalPrice = state.items.reduce(
                (sum, current) => sum + current.price * current.count,
                0,
            );
        },
        removeItem(state, action) {
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
