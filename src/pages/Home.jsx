import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../context/SearchContext';

import { useSelector, useDispatch } from 'react-redux';

import { setFilters } from '../redux/slices/filterSlice';

const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const { categoryId, sortSelector } = useSelector((state) => state.filter);
    const pageIndex = useSelector((state) => state.filter.pageIndex);

    const { searchValue } = React.useContext(SearchContext);

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            console.log(params);
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

            setIsLoading(true);

            axios
                .get(
                    `https://62b7554a691dcea2733d6cff.mockapi.io/items?page=${pageIndex}&limit=4&sortBy=${sort}${search}&order=${order}${category}`,
                )
                .then((res) => {
                    setPizzas(res.data);
                    setIsLoading(false);
                });
        }

        isSearch.current = false;
    }, [categoryId, sortSelector, searchValue, pageIndex]);

    React.useEffect(() => {
        if(isMounted.current){const queryString = qs.stringify({
            categoryId,
            sortProperty: sortSelector.property,
            pageIndex,
        });

        navigate(`?${queryString}`);}
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
                {isLoading
                    ? [...Array(4)].map((item, index) => <PizzaSkeleton key={index} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
            </div>
            <Pagination numberOfPages={3} />
        </>
    );
};

export default Home;
