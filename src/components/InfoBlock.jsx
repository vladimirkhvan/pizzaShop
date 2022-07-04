import React from 'react';

const InfoBlock = ({ title, description, img }) => {
    return (
        <div className="infoBlock">
            {img && <img src={img} alt={title}/>}
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

export default InfoBlock;
