"use client";

import axiosInstance from "@/config/axiosInstance";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Image,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import { mutate } from "swr";
import PaginationControls from "@/components/PaginationControls";
import {
  faPenToSquare,
  faTrash,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Meal = {
  id: string;
  id_category: string;
  name: string;
  best_seller: boolean;
  price: number;
  url: string[];
};
const MealPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalData, setShowModalData] = useState({
    id: "",
    name: "",
    url: [""],
    id_category: "",
    best_seller: false,
    price: 0,
  });
  const [type, setType]: any = useState(10);
  const [seller, setSeller]: any = useState("A");
  const page = searchParams["page"] ?? "1";

  const start = (Number(page) - 1) * Number(type);
  const end = start + Number(type);

  const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

  const { data, error } = useSWR("/meal/get-all", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  let count = 0;
  //   let dataPagination: Meal[] = [];
  const [dataPagination, setDataPagination] = useState<Meal[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      console.log("-----seller--------", seller);
      const dataP = data
        ?.filter((item: Meal) => {
          if (item.best_seller === true && seller === "B") {
            return item;
          }

          if (item.best_seller === false && seller === "K") {
            return item;
          }
          if (seller === "A") return item;
        })
        ?.slice(start, end);
      setDataPagination(dataP);
    }
  }, [data, start, end, seller]);

  const openModal = (data: Meal) => {
    setShowModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModalData({
      id: "",
      name: "",
      url: [""],
      id_category: "",
      best_seller: false,
      price: 0,
    });
    setShowModal(false);
  };

  const handlerDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/meal/delete/${id}`);
      toast.info("Xóa thành công!");
      mutate("/meal/get-all");
    } catch (error) {
      console.log(error);
    }
  };

  const handlerUpdateSeller = async (data: boolean, id: string) => {
    try {
      const response = await axiosInstance.put(`/meal/update-seller`, {
        id: id,
        best_seller: data,
      });
      toast.info("Cập nhật thành công");
      mutate("/meal/get-all");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Admin Page</h1>
      <PaginationControls
        url="/Admin/meal-admin/"
        partion={type}
        setPartion={setType}
        lengthData={data?.length}
        hasNextPage={end < data?.length}
        hasPrevPage={start > 0}
        seller={seller}
        setSeller={setSeller}
      />

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông số loại món ăn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên loại món ăn như Luộc, Xào, Hấp..."
                defaultValue={showModalData.name}
                // onChange={(e) => setNameCategory(e.target.value)}
              />
              <Form.Text className="text-muted">
                Tên loại món ăn sẽ được hiển thị trên trang web
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Image
                width={100}
                height={100}
                //   align="center"
                // src={showModalData.url}
                fluid
              />
              <Form.Label>
                Hình ảnh của loại món ăn (Lưu ý: chỉ có 1 hình)
              </Form.Label>
              <Form.Control
                type="file"
                // onChange={(e: any) => setFileName(e.target.files[0])}
              />
            </Form.Group>
            {/* <Button variant="primary" onClick={() => handleFileUpload()}>
              Tạo mới
            </Button> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Header>Có thể sửa loại món ăn. Lưu ý: hạn chế xóa</Card.Header>
        <Card.Body>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên Món ăn</th>
                <th>Giá</th>
                <th>Bán chạy</th>
                <th>Hình ảnh</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {dataPagination?.map((item: Meal) => (
                <tr key={item.id}>
                  <td>{++count}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td className="w-50-tb">
                    {item.best_seller ? (
                      <Badge bg="success">Có</Badge>
                    ) : (
                      <Badge bg="danger">Không</Badge>
                    )}
                  </td>
                  <td className="image_meal">
                    {item.url.map((url) => (
                      <Image key={url} src={url} width={100} height={100} />
                    ))}
                  </td>
                  <td>
                    <div>
                      <Button variant="warning" onClick={() => openModal(item)}>
                        <FontAwesomeIcon color="white" icon={faPenToSquare} />
                      </Button>
                      <Button
                        className="ms-2"
                        variant="danger"
                        onClick={() => handlerDelete(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <Button
                        className="ms-2"
                        variant={`${item.best_seller ? "danger" : "success"}`}
                        onClick={() =>
                          handlerUpdateSeller(!item.best_seller, item.id)
                        }
                      >
                        <FontAwesomeIcon color="white" icon={faBolt} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ToastContainer></ToastContainer>
        </Card.Body>
      </Card>
    </>
  );
};

export default MealPage;
