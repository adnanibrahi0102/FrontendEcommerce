import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VideoCarousel = () => {
    const videos = [
        "https://cdn.coverr.co/videos/coverr-man-adjusting-denim-jacket-1896/1080p.mp4",
        "https://cdn.coverr.co/videos/coverr-girl-posing-on-the-edge-of-a-terrace-9533/1080p.mp4",
        "https://cdn.coverr.co/videos/coverr-walking-down-the-street-wearing-boots-580/1080p.mp4",
        "https://cdn.coverr.co/videos/coverr-a-teenage-boy-climbing-into-his-car-6270/1080p.mp4"
    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="container">
            <Slider {...settings}>
                {videos.map((video, index) => (
                    <div key={index} className="card ">
                        <div className="card-body p-2">
                            <video  controls autoPlay muted className="img-fluid rounded">
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default VideoCarousel;
