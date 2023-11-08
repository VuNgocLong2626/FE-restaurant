"use client";

import axiosInstance from "@/config/axiosInstance";
import { Card, Col, Row } from "react-bootstrap";
import useSWR, { SWRResponse } from "swr";
import CardImage from "./CardImage";
import { useEffect, useState } from "react";

type Meal = {
  id: string;
  id_category: string;
  name: string;
  best_seller: boolean;
  price: number;
  url: string[];
};

const ListItem = () => {
  const numberOfCards = 3;

  const fetcher = (url: string) =>
    axiosInstance.get<Meal[]>(url).then((res) => res.data);

  const { data, error, isValidating }: SWRResponse<Meal[]> = useSWR(
    "/meal/get-all-seller",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const [more, Setmore] = useState(data?.slice(0, numberOfCards));
  useEffect(() => {
    Setmore(data?.slice(0, numberOfCards));
  }, [data]);
  const loadMoreItem = () => {
    Setmore(data?.slice(0, (more?.length ?? 0) + numberOfCards));
  };
  return (
    <>
      <div className="container">
        <Row>
          <div className="col-xl-12 col-lg-12 col-12 header-category">
            <h2>
              <span>Món ăn bán chạy</span>
            </h2>
          </div>
          <div className="container">
            {data ? (
              <>
                <Row>
                  {more?.map((item: Meal) => (
                    <Col
                      key={item.id}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      className="list-card"
                    >
                      <Card className="card_" style={{ width: "18rem" }}>
                        {/* <Card.Img variant="top" src={item.url[0]} /> */}
                        <CardImage
                          url={item.url}
                          mainUrl={item.url[0]}
                          card={true}
                        ></CardImage>

                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>
                            {item.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <>
                <Row>
                  {[...Array(numberOfCards)].map((_, index) => (
                    <Col
                      key={index}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      className="list-card"
                    >
                      <Card
                        key={index}
                        className="card_"
                        style={{ width: "18rem" }}
                      >
                        <Card.Img
                          variant="top"
                          src="loading_card.jpg"
                          width={280}
                          height={280}
                        />
                        <Card.Body>
                          <Card.Title>
                            <Card.Img
                              style={{ borderRadius: "0.5rem" }}
                              variant="top"
                              src="loading_card.jpg"
                              width={254}
                              height={24}
                            />
                          </Card.Title>
                          <Card.Text>
                            <Card.Img
                              style={{ borderRadius: "0.5rem" }}
                              variant="top"
                              src="loading_card.jpg"
                              width={50}
                              height={24}
                            />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            )}
            {more?.length === data?.length || (
              <div>
                <p className="add-item" onClick={loadMoreItem}>
                  ... Xem thêm
                </p>
              </div>
            )}
          </div>
        </Row>
      </div>
    </>
  );
};

export default ListItem;
