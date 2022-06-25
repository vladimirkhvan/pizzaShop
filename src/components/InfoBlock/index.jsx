import React from 'react';

import styles from './InfoBlock.module.scss';

const InfoBlock = ({ title, description, img }) => {
    return (
        <div className={styles.infoBlock}>
            <h1>{title}</h1>
            <p>{description}</p>
            {img && <img src={img} />}
        </div>
    );
};

export default InfoBlock;
