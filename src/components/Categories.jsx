import React from 'react';

export default Categoties;

function Categoties({activeIndex, setActiveIndex}) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? 'active' : ''}
                        onClick={() => setActiveIndex(index)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
