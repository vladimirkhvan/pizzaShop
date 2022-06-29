import React from 'react';

const Pagination = ({ numberOfPages, activeIndex, setActiveIndex }) => {
    const pageIndex = [];
    for (let i = 0; i < numberOfPages; i++) {
        pageIndex.push(
            <li
                key={i}
                onClick={() => setActiveIndex(i)}
                className={activeIndex === i ? 'active' : ''}>
                {i + 1}
            </li>,
        );
    }
    function decrement() {
        if (activeIndex) {
            setActiveIndex((prevActiveIndex) => prevActiveIndex - 1);
        }
    }
    function increment() {
        if (activeIndex + 1 < numberOfPages) {
            setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);
        }
    }
    console.log(activeIndex);
    return (
        <div className='pagination'>
            <ul>
                <li onClick={() => decrement()}>{'<'}</li>

                {pageIndex}

                <li onClick={() => increment()}>{'>'}</li>
            </ul>
        </div>
    );
};

export default Pagination;
