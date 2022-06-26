import React from 'react';

const InfoBlock = ({ title, description, img }) => {
    return (
        <div className="infoBlock">
            <h1>{title}</h1>
            <p>{description}</p>
            {img && <img src={img} alt={title}/>}
        </div>
    );
};

export default InfoBlock;
