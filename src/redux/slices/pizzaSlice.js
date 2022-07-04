import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'pending',
};

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async ({ sort, order, category, search, pageIndex }) => {
        const { data } = await axios.get(
            `https://62b7554a691dcea2733d6cff.mockapi.io/items?page=${pageIndex}&limit=4&sortBy=${sort}${search}&order=${order}${category}`,
        );

        return data;
    },
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizza(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state, action) => {
            state.items = [];
            state.status = 'pending';
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchPizza.rejected, (state, action) => {
            state.items = [];
            state.status = 'rejected';
        });
    },
});

export const { setPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
