import React from 'react';

const VideoFrame = () => {
    return (
        <div className="container-fluid p-0">
            <video
                autoPlay
                loop
                muted
                className="w-100"
                style={{ minHeight: '100vh', objectFit: 'cover' }}
            >
                <source src="/videoFrame.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoFrame;

// 