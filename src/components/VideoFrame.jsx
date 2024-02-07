import React from "react";

const VideoFrame = () => {
  return (
    <div
      className="video-container"
      style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}
    >
      <video
        autoPlay
        loop
        muted
        className="w-100"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/videoFrame.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoFrame;
