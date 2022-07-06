import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import MainLayout from './layout/MainLayout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

import { InfoBlock, PizzaItem } from './components';

const Cart = React.lazy(() => import('./pages/Cart'));

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="cart"
                    element={
                        <React.Suspense
                            fallback={
                                <InfoBlock
                                    title="Идет загрузка..."
                                    description="Подождите немного, официант уже бежит с вашей пиццей :>"
                                />
                            }>
                            <Cart />
                        </React.Suspense>
                    }
                />
                <Route path="pizza/:id" element={<PizzaItem />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
