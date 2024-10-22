/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import axios from 'axios';

const ShopCarousel = ({ shopId }) => {
    const APP_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${APP_URL}/ma-shop-gallery/${shopId}`);
            if (response.data.status === 200) {
                setImages(response.data.gallery);
            } else {
                setError(true);
            }
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    useEffect(() => {
        if (shopId) {
            fetchImages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shopId]);

    const getOptimalSlidesToShow = (imageCount) => {
        if (imageCount >= 4) return 4;
        if (imageCount === 3) return 3;
        return imageCount; // For 1 or 2 images
    };

    const settings = {
        dots: true,
        infinite: false, // Change to false when fewer slides
        speed: 500,
        slidesToShow: getOptimalSlidesToShow(images.length),
        slidesToScroll: 1,
        dotsClass: "slick-dots",
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(3, images.length),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(2, images.length),
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (error || images.length === 0) {
        return (
            <div className="text-center text-gray-500 mb-8 mt-8">
                No gallery images found for this shop.
            </div>
        );
    }

    // Render a single image without Slider when there's only one image
    if (images.length === 1) {
        return (
            <div className="mb-8">
                <img
                    src={`${IMG_URL}/gallery/thumb/${images[0].image}`}
                    alt={images[0].catalog_item}
                    className="w-full h-80 object-cover"
                />
            </div>
        );
    }

    // For 2-4 images, use a container with justified content
    if (images.length <= 4) {
        return (
            <div className="mb-8">
                <div className="grid gap-4"
                    style={{
                        gridTemplateColumns: `repeat(${images.length}, 1fr)`
                    }}>
                    {images.map((image) => (
                        <div key={image.id} className="relative h-80">
                            <img
                                src={`${IMG_URL}/gallery/thumb/${image.image}`}
                                alt={image.catalog_item}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // For more than 4 images, use the carousel
    return (
        <div className="mb-8">
            <Slider {...settings}>
                {images.map((image) => (
                    <div key={image.id} className="px-1">
                        <img
                            src={`${IMG_URL}/gallery/thumb/${image.image}`}
                            alt={image.catalog_item}
                            className="w-full h-80 object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const CustomNextArrow = ({ onClick }) => (
    <div
        onClick={onClick}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer"
    >
        <AiOutlineArrowRight color='#000' size={30} />
    </div>
);

const CustomPrevArrow = ({ onClick }) => (
    <div
        onClick={onClick}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer"
    >
        <AiOutlineArrowLeft color='#000' size={30} />
    </div>
);

export default ShopCarousel;