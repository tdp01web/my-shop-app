import React from 'react'
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

const SliderBanner = () => {
    return (
        <Carousel autoplay>
            <Link to=''>
                <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/CT_1_1240x697_8c8107e955.png" alt="" />
            </Link>
            <Link to=''>
                <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/CT_1_1240x697_43d1fd795b.png" alt="" />
            </Link>
            <Link to=''>
                <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/CT_1_1240x697_19abf9de2c.png" alt="" />
            </Link>
            <Link to=''>
                <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/C1_Apple_1240x697_b5b5c1ceb4.png" alt="" />
            </Link>
        </Carousel>
    )
}

export default SliderBanner