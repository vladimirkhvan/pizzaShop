import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId as setActiveIndex } from '../redux/slices/filterSlice';

function Categoties() {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    const activeIndex = useSelector(state => state.filter.categoryId);
    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? 'active' : ''}
                        onClick={() => dispatch(setActiveIndex(index))}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categoties;
