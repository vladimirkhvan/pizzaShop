import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type TPizza = {
    id: string;
    category: number;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
};

enum Status {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected',
}

interface PizzaSliceState {
    items: TPizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.PENDING,
};

type TFetchPizza = {
    sort: string;
    order: string;
    category: string;
    search: string;
    pageIndex: number;
};

export const fetchPizza = createAsyncThunk(
    'pizza/fetchPizza',
    async ({ sort, order, category, search, pageIndex }: TFetchPizza) => {
        const { data } = await axios.get<TPizza[]>(
            `https://62b7554a691dcea2733d6cff.mockapi.io/items?page=${pageIndex}&limit=4&sortBy=${sort}${search}&order=${order}${category}`,
        );

        return data as TPizza[];
    },
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizza(state, action: PayloadAction<TPizza[]>) {
            state.items = action.payload;
        },
    },
    
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.items = [];
            state.status = Status.PENDING;
        });
        builder.addCase(fetchPizza.fulfilled, (state, action: PayloadAction<TPizza[]>) => {
            state.items = action.payload;
            state.status = Status.FULFILLED;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.items = [];
            state.status = Status.REJECTED;
        });
    },
});

export const { setPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
