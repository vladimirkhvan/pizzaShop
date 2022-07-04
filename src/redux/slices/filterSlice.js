import { createSlice } from '@reduxjs/toolkit';

import { selectorsDictionary } from '../../components/Sort';

const initialState = {
    categoryId: 0,
    sortSelector: {
        title: 'популярности (DESC)',
        property: 'rating',
    },
    pageIndex: 1,
    searchValue: '',
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
        setPageIndex(state, action) {
            state.pageIndex = action.payload;
        },
        incrementPageIndex(state, action) {
            if (state.pageIndex < action.payload) {
                state.pageIndex++;
            }
        },
        decrementPageIndex(state) {
            if (state.pageIndex > 1) {
                state.pageIndex--;
            }
        },
        setSearchValue(state, action){
            state.searchValue = action.payload;
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.sortSelector = selectorsDictionary.find(
                (item) => item.property === action.payload.sortProperty,
            );
            state.pageIndex = Number(action.payload.pageIndex);
        },
    },
});

export const {
    setCategoryId,
    setSortSelector,
    setPageIndex,
    incrementPageIndex,
    decrementPageIndex,
    setSearchValue,
    setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
