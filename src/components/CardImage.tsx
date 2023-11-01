"use client";

import React, { useState } from "react";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Image } from "react-bootstrap";

type dataImage = {
  url: string[];
  mainUrl: string;
};

const CardImage = (props: dataImage) => {
  const { url, mainUrl } = props;
  const images = url.map((url) => {
    return {
      src: url,
      alt: "Mechanical keyboard with white keycaps.",
    };
  });
  //   const images = [
  //     {
  //       src: "https://source.unsplash.com/sQZ_A17cufs/549x711",
  //       alt: "Mechanical keyboard with white keycaps.",
  //     },
  //     {
  //       src: "https://source.unsplash.com/rsAeSMzOX9Y/768x512",
  //       alt: "Mechanical keyboard with white, pastel green and red keycaps.",
  //     },
  //     {
  //       src: "https://source.unsplash.com/Z6SXt1v5tP8/768x512",
  //       alt: "Mechanical keyboard with white, pastel pink, yellow and red keycaps.",
  //     },
  //   ];

  let [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Lightbox
      </button> */}
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
