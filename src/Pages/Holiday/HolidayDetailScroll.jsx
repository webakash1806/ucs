import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';

// Assuming `data` is an array where each item has a `secure_url` for the image link
const HolidayDetailScroll = ({ data }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Check if `data` is available and map it to the required image format
        if (data && data.length > 0) {
            const formattedImages = data.map(item => ({
                itemImageSrc: item.secure_url, // use the secure_url from the data
                thumbnailImageSrc: item.secure_url, // use the secure_url for thumbnail as well
                alt: item.alt || 'Holiday Image'  // Optional: set alt text
            }));
            setImages(formattedImages);
        }
    }, [data]); // Only run when `data` changes

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }} className='rounded-lg' />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ height: '100px', objectFit: 'cover', display: 'block' }} />;
    };

    return (
        <div className="card ">
            <Galleria 
                value={images} 
                numVisible={5} 
                circular 
                style={{ maxWidth: '840px' }}
                showThumbnails={false} 
                showItemNavigators 
                item={itemTemplate} 
                thumbnail={thumbnailTemplate} 
            />
        </div>
    );
}

export default HolidayDetailScroll;
