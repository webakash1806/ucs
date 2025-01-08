import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';

const HolidayDetailScroll = ({ data }) => {
    const [images, setImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            const formattedImages = data.map(item => ({
                itemImageSrc: item.secure_url,
                thumbnailImageSrc: item.secure_url,
                alt: item.alt || 'Holiday Image'
            }));
            setImages(formattedImages);
        }
    }, [data]);

    const itemTemplate = (item) => {
        return (
            <div className="relative">
                <img
                    src={item.itemImageSrc}
                    alt={item.alt}
                    style={{
                        width: '100%',
                        height: '460px',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                    className="rounded-lg"
                />
            </div>
        );
    };

    const thumbnailTemplate = (item) => {
        return (
            <img
                src={item.thumbnailImageSrc}
                alt={item.alt}
                style={{ height: '100px', objectFit: 'cover', display: 'block' }}
                className="rounded-md"
            />
        );
    };

    const onSlideChange = (event) => {
        const newIndex = event.index;
        setActiveIndex(newIndex);
    };

    return (
        <div className="card max-w-3xl mx-auto ">
            <Galleria
                value={images}
                activeIndex={activeIndex}
                onItemChange={onSlideChange}
                numVisible={5}
                circular
                autoPlay
                transitionInterval={3000} // Change slides every 3 seconds
                style={{ maxWidth: '100%' }}
                showThumbnails={false}
                showItemNavigators
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
            />
        </div>
    );
};

export default HolidayDetailScroll;
