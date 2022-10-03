import React from 'react';
import styles from './Carousel.module.css';
import {Image,Carousel as AntCarousel} from 'antd';

export const Carousel:React.FC=()=>{
    return(
        <AntCarousel autoplay className={styles.slider}>
            {/*<Image src={carouselImage1} />*/}
            {/*<Image src={carouselImage2} />*/}
            {/*<Image src={carouselImage3} />*/}
        </AntCarousel>
    );
}