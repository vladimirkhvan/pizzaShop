import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../context/SearchContext';

const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(true);

    const [chosenCategoryId, setChosenCategoryId] = React.useState(0);

    const [sortSelector, setSortSelector] = React.useState({
        title: 'популярности (DESC)',
        property: 'rating',
    });

    const [pageIndex, setPageIndex] = React.useState(0);

    const { searchValue } = React.useContext(SearchContext);

    React.useEffect(() => {
        const sortingSelector = sortSelector.property.replace('-', '');
        const order = sortSelector.property[0] === '-' ? 'asc' : 'desc';
        const category = chosenCategoryId ? `&category=${chosenCategoryId}` : '';
        const search = searchValue ? `&title=${searchValue}` : '';

        setIsLoading(true);

        axios
            .get(
                `https://62b7554a691dcea2733d6cff.mockapi.io/items?page=${pageIndex+1}&limit=4&sortBy=${sortingSelector}${search}&order=${order}${category}`,
            )
            .then((res) => {
                setPizzas(res.data);
                setIsLoading(false);
            });
    }, [chosenCategoryId, sortSelector, searchValue, pageIndex]);

    return (
        <>
            <div className="content__top">
                <Categories activeIndex={chosenCategoryId} setActiveIndex={setChosenCategoryId} />
                <Sort selector={sortSelector} setSelector={setSortSelector} />
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
