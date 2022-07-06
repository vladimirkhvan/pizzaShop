import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../redux/cart/slice';
import { RootState } from '../redux/store';

type TType = 'тонкое' | 'традиционное';

export const typeDictionary: TType[] = ['тонкое', 'традиционное'];

interface PizzaBlockProps {
    id: string;
    title: string;
    imageUrl: string;
    types: number[];
    price: number;
    sizes: number[];
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
    id,
    title,
    imageUrl,
    types,
    price,
    sizes,
}) => {
    const [activeType, setActiveType] = React.useState<number>(0);
    const [activeSizeIndex, setActiveSizeIndex] = React.useState<number>(0);

    let items = useSelector((state: RootState) => state.cart.items);

    if (items === null) {
        items = [];
    }

    let count: number = 0;

    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            count += items[i].count;
        }
    }

    const dispatch = useDispatch();

    return (
        <div className="pizza-block">
            <Link to={`/pizza/${id}`}>
                <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
                <h4 className="pizza-block__title">{title}</h4>
            </Link>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((typeIndex, index) => (
                        <li
                            key={index}
                            className={activeType === index ? 'active' : ''}
                            onClick={() => setActiveType(index)}>
                            {typeDictionary[typeIndex]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, index) => (
                        <li
                            key={index}
                            className={activeSizeIndex === index ? 'active' : ''}
                            onClick={() => setActiveSizeIndex(index)}>
                            {size} см.
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <div
                    className="button button--outline button--add"
                    onClick={() =>
                        dispatch(
                            addItem({
                                id,
                                title,
                                image: imageUrl,
                                type: typeDictionary[activeType],
                                size: sizes[activeSizeIndex],
                                price,
                                count: 1,
                            }),
                        )
                    }>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {count > 0 && <i>{count}</i>}
                </div>
            </div>
        </div>
    );
};
