import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    sortSelector: {
        title: 'популярности (DESC)',
        property: 'rating',
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortSelector(state, action) {
            state.sortSelector = action.payload;
        },
    },
});

export const { setCategoryId, setSortSelector } = filterSlice.actions;
export default filterSlice.reducer;
