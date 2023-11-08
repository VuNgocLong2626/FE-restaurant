"use client";

import { Image, Row } from "react-bootstrap";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "@/config/axiosInstance";
import useSWR from "swr";
import OpenAndClose from "@/components/OpenAndClose";
import ListItem from "@/components/ListItem";
import { Suspense } from "react";
import Loading from "./loading";
import { Shimmer } from "react-shimmer";

type Category = {
  id: string;
  name: string;
  url: string;
};
const DashboardPage = () => {
  const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

  const { data, error } = useSWR("/category/get-all", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Adjust the number of slides shown for tablets
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Adjust the number of slides shown for mobile devices
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <Image alt="adsasd" src="/test/slider_1_1.jpg" fluid />
      <div className="section_category">
        <div className="container">
          <Row>
            <div className="col-xl-12 col-lg-12 col-12 header-category">
              <h2>
                <span>Danh mục sản phẩm</span>
              </h2>
            </div>
            {data ? (
              <div className="col-xl-12 col-lg-12 col-12 item-category ">
                <Slider {...settings}>
                  {data?.map((item: Category) => (
                    <div className="element-category" key={item.id}>
                      <Image
                        width={300}
                        height={200}
                        alt="iamge category"
                        src={item.url}
                        fluid
                      />
                      <h3>{item.name}</h3>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : error ? (
              <p>...Errror</p>
            ) : (
              <div className="col-xl-12 col-lg-12 col-12 item-category ">
                {/* <Shimmer width={Number("100%")} height={200} /> */}
              </div>
            )}
            {/* <div className="col-xl-12 col-lg-12 col-12 item-category ">
              <Slider {...settings}>
                {data?.map((item: Category) => (
                  <div className="element-category" key={item.id}>
                    <Image
                      width={300}
                      height={200}
                      alt="iamge category"
                      src={item.url}
                      fluid
                    />
                    <h3>{item.name}</h3>
                  </div>
                ))}
              </Slider>
            </div> */}
          </Row>
        </div>
      </div>
      <OpenAndClose></OpenAndClose>
      <ListItem></ListItem>
    </>
  );
};

export default DashboardPage;
