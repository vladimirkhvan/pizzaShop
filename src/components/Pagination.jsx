import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    setPageIndex as setActiveIndex,
    incrementPageIndex as increment,
    decrementPageIndex as decrement,
} from '../redux/slices/filterSlice';

const Pagination = ({ numberOfPages }) => {
    const indexes = [];
    const activeIndex = useSelector((state) => state.filter.pageIndex);
    const dispatch = useDispatch();

    for (let i = 1; i < numberOfPages + 1; i++) {
        indexes.push(
            <li
                key={i}
                onClick={() => dispatch(setActiveIndex(i))}
                className={activeIndex === i ? 'active' : ''}>
                {i}
            </li>,
        );
    }

    return (
        <div className="pagination">
            <ul>
                <li onClick={() => dispatch(decrement(numberOfPages))}>{'<'}</li>

                {indexes}

                <li onClick={() => dispatch(increment(numberOfPages))}>{'>'}</li>
            </ul>
        </div>
    );
};

export default Pagination;
