import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId as setActiveIndex } from '../redux/filter/slice';
import { RootState } from '../redux/store';

export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categoties: React.FC = () => {
    const activeIndex = useSelector((state: RootState) => state.filter.categoryId);
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
};

export default Categoties;
