import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../context/SearchContext';

import { useSelector } from 'react-redux';

const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(true);

    const { categoryId, sortSelector } = useSelector((state) => state.filter);

    const [pageIndex, setPageIndex] = React.useState(0);

    const { searchValue } = React.useContext(SearchContext);

    React.useEffect(() => {
        const sort = sortSelector.property.replace('-', '');
        const order = sortSelector.property[0] === '-' ? 'asc' : 'desc';
        const category = categoryId ? `&category=${categoryId}` : '';
        const search = searchValue ? `&title=${searchValue}` : '';

        setIsLoading(true);

        axios
            .get(
                `https://62b7554a691dcea2733d6cff.mockapi.io/items?page=${
                    pageIndex + 1
                }&limit=4&sortBy=${sort}${search}&order=${order}${category}`,
            )
            .then((res) => {
                setPizzas(res.data);
                setIsLoading(false);
            });
    }, [categoryId, sortSelector, searchValue, pageIndex]);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...Array(4)].map((item, index) => <PizzaSkeleton key={index} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
            </div>
            <Pagination numberOfPages={3} activeIndex={pageIndex} setActiveIndex={setPageIndex} />
        </>
    );
};

export default Home;
