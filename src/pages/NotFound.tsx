import React from 'react';

import {InfoBlock} from '../components';

import notFoundImg from '../assets/img/notFound.jpg'

const NotFound:React.FC = () => {
    return (
        <>
            <InfoBlock
                title="Ничего не было найдено"
                description="К сожалению, такой страницы нет на нашем сайте"
                img={notFoundImg}
            />
        </>
    );
};

export default NotFound;
