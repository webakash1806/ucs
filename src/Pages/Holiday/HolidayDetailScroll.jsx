import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import img1 from '../../assets/holiday/holiday1.png';
import img2 from '../../assets/holiday/holiday2.png';

// Define PhotoService function directly in the same file
const getImages = async () => {
    return [
        { itemImageSrc: img1, thumbnailImageSrc: img1, alt: 'Holiday Image 1' },
        { itemImageSrc: img2, thumbnailImageSrc: img2, alt: 'Holiday Image 2' },
    ];
};

const HolidayDetailScroll = () => {
    const [images, setImages] = useState(null);

    useEffect(() => {
        // Call getImages function and set the images state
        getImages().then(data => setImages(data));
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }} className='rounded-lg' />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ height: '100px', objectFit: 'cover', display: 'block' }} />;
    };

    return (
        <div className="card"> 
            <Galleria value={images} numVisible={5} circular style={{ maxWidth: '840px' }}
                showThumbnails={false} showItemNavigators item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
    );
}

export default HolidayDetailScroll;
