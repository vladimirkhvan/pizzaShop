import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import InfoBlock from './InfoBlock';

import { categories as categoryDictionary } from './Categories';
import { typeDictionary } from './PizzaBlock';

import { addItem } from '../redux/slices/cartSlice';

const PizzaItem = () => {
    const { id } = useParams();

    const [pizza, setPizza] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const [activeType, setActiveType] = React.useState(0);
    const [activeSizeIndex, setActiveSizeIndex] = React.useState(0);
    
    const items = useSelector(state => state.cart.items);

    const dispatch = useDispatch();

    let count = 0;

    for(let i = 0; i < items.length; i++){
        if(items[i].id === id){
            count += items[i].count;
        }
    }

    React.useEffect(() => {
        axios.get(`https://62b7554a691dcea2733d6cff.mockapi.io/items/${id}`).then((res) => {
            setPizza(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <InfoBlock title="Загрузка..." description="Электронная пицца еще не допеклась :>" />
        );
    }

    return (
        <div className="pizza-item">
            <div className="pizza-item__left-side">
                <img
                    src={pizza.imageUrl}
                    alt="pizza"
                />
            </div>
            <div className="pizza-item__right-side">
                <h1>{pizza.title}</h1>
                <p className="pizza-item__subtitle">Тип: {categoryDictionary[pizza.category]}</p>
                <div className="pizza-item__selector">
                    <ul>
                        {pizza.types.map((typeIndex, index) => (
                            <li
                                key={index}
                                className={activeType === index ? 'active' : ''}
                                onClick={() => setActiveType(index)}>
                                {typeDictionary[typeIndex]}
                            </li>
                        ))}
                    </ul>

                    <ul>
                        {pizza.sizes.map((size, index) => (
                            <li
                                key={index}
                                className={activeSizeIndex === index ? 'active' : ''}
                                onClick={() => setActiveSizeIndex(index)}>
                                {size} см.
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="pizza-item__description">
                    Рейтинг <span></span> {pizza.rating} / 10
                </p>

                <p className="pizza-item__description">
                    Колличество <span></span> {count}
                </p>

                <p className="pizza-item__description">
                    Цена <span></span> {pizza.price} ₽
                </p>

                <div className="pizza-item__buttonGroup">
                    <Link to="/">
                        <button className="pizza-item__button">Назад</button>
                    </Link>
                    <button className="pizza-item__button" onClick={()=>dispatch(
                            addItem({
                                id,
                                title: pizza.title,
                                image: pizza.imageUrl,
                                type: typeDictionary[activeType],
                                size: pizza.sizes[activeSizeIndex],
                                price: pizza.price,
                                count: 1,
                            }),
                        )}>Добавить</button>
                </div>
            </div>
        </div>
    );
};

export default PizzaItem;
