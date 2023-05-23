import React from "react";

const ImageExtractorComponent = ({ text }) => {
  const extractImages = (text) => {
    const imageRegex = /n!\[.*?\]\((.*?)\)/g;
    const matches = text.matchAll(imageRegex);
    const images = Array.from(matches, (match) => match[1]);
    return images;
  };

  const imageSrcs = extractImages(text);

  console.log("Extracted URLs:", imageSrcs);

  return (
    <div>
      {imageSrcs.map((src, index) => (
        <div key={index}>
          <img src={src} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ImageExtractorComponent;
