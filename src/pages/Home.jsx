import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';
import InfoBlock from '../components/InfoBlock';

import { SearchContext } from '../context/SearchContext';

import { useSelector, useDispatch } from 'react-redux';

import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';

const Home = () => {

    const { categoryId, sortSelector, pageIndex } = useSelector((state) => state.filter);
    const { items: pizzas, status } = useSelector((state) => state.pizza);

    const { searchValue } = React.useContext(SearchContext);

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            dispatch(setFilters({ ...params }));
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        if (!isSearch.current) {
            const sort = sortSelector.property.replace('-', '');
            const order = sortSelector.property[0] === '-' ? 'asc' : 'desc';
            const category = categoryId ? `&category=${categoryId}` : '';
            const search = searchValue ? `&title=${searchValue}` : '';

            dispatch(fetchPizza({ sort, order, category, search, pageIndex }));
        }

        isSearch.current = false;
    }, [categoryId, sortSelector, searchValue, pageIndex]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortProperty: sortSelector.property,
                pageIndex,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortSelector, searchValue, pageIndex]);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'rejected' ? (
                    <InfoBlock />
                ) : status === 'pending' ? (
                    [...Array(4)].map((item, index) => <PizzaSkeleton key={index} />)
                ) : (
                    pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
                )}
            </div>
            <Pagination numberOfPages={3} />
        </>
    );
};

export default Home;
