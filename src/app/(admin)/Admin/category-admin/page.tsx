"use client";

import axiosInstance from "@/config/axiosInstance";
import useSWR from "swr";
import { Card, Table, Modal, Image, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { mutate } from "swr";
import { useState } from "react";
import PaginationControls from "@/components/PaginationControls";

type Category = {
  id: string;
  name: string;
  url: string;
};
const CategoryAllPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalData, setShowModalData] = useState({
    id: "",
    name: "",
    url: "",
  });
  const [fileName, setFileName] = useState("Upload Boundary File");
  const [nameCategory, setNameCategory] = useState("");
  const [type, setType]: any = useState(2);
  const page = searchParams["page"] ?? "1";
  // const type = searchParams["per_page"] ?? "5";

  const start = (Number(page) - 1) * Number(type); // 0, 5, 10 ...
  const end = start + Number(type); // 5, 10, 15 ...

  const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

  const { data, error } = useSWR("/category/get-all", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log("---------length------------", data?.length);
  let count = 0;

  const dataPagination = data?.slice(start, end);

  const openModal = (data: Category) => {
    setShowModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModalData({
      id: "",
      name: "",
      url: "",
    });
    setShowModal(false);
  };

  console.log("-----------", type);

  const handlerDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/category/delete/${id}`);
      toast.info("Xóa thành công!");
      mutate("/category/get-all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Tất cả loại món ăn</h1>

      <PaginationControls
        partion={type}
        setPartion={setType}
        lengthData={data?.length}
        hasNextPage={end < data?.length}
        hasPrevPage={start > 0}
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
                onChange={(e) => setNameCategory(e.target.value)}
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
                src={showModalData.url}
                fluid
              />
              <Form.Label>
                Hình ảnh của loại món ăn (Lưu ý: chỉ có 1 hình)
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e: any) => setFileName(e.target.files[0])}
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
                <th>Tên loại</th>
                <th>Hình ảnh</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {dataPagination?.map((item: Category) => (
                <tr key={item.id}>
                  <td>{++count}</td>
                  <td>{item.name}</td>
                  <td>
                    <Image
                      width={200}
                      height={200}
                      //   align="center"
                      src={item.url}
                      fluid
                    />
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => openModal(item)}>
                      Chỉnh sửa
                    </Button>
                    <Button
                      className="ms-2"
                      variant="danger"
                      onClick={() => handlerDelete(item.id)}
                    >
                      Xóa
                    </Button>
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

export default CategoryAllPage;
