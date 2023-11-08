"use client";

import React, { useState } from "react";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Card, Image } from "react-bootstrap";

type dataImage = {
  url: string[];
  mainUrl: string;
  card?: boolean;
};

const CardImage = (props: dataImage) => {
  const { url, mainUrl, card } = props;

  const images = url.map((url) => {
    return {
      src: url,
      alt: "Mechanical keyboard with white keycaps.",
    };
  });

  let [isOpen, setIsOpen] = useState(false);

  const hoverZoom = {
    transition: "transform 0.2s", // Define the transition duration
    "&:hover": {
      transform: "scale(1.1)", // Apply the zoom effect
    },
    cursor: "pointer",
  };
  return (
    <div>
      {card ? (
        <Card.Img
          variant="top"
          // style={{ cursor: "pointer" }}
          style={hoverZoom}
          onClick={() => {
            setIsOpen(true);
          }}
          src={mainUrl}
        />
      ) : (
        // <Card.Img variant="top" src={mainUrl} />
        <Image
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsOpen(true);
          }}
          width={100}
          height={100}
          alt="Preview"
          src={mainUrl}
        />
      )}

      <SlideshowLightbox
        images={images}
        showThumbnails={true}
        open={isOpen}
        lightboxIdentifier="lbox1"
        onClose={() => {
          setIsOpen(false);
        }}
      ></SlideshowLightbox>
    </div>
  );
};

export default CardImage;
