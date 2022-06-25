import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';

const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get('https://62b7554a691dcea2733d6cff.mockapi.io/items').then((res) => {
            setPizzas(res.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...Array(8)].map((item, index) => <PizzaSkeleton key={index} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
            </div>
        </>
    );
};

export default Home;
