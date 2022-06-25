import React from 'react';

export default Categoties;

function Categoties() {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    const [activeIndex, setActiveIndex] = React.useState(0);

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
