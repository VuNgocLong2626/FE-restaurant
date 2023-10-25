"use client";

import axiosInstance from "@/config/axiosInstance";
import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { mutate } from "swr";

const CreateCategoryPage = () => {
  const [fileName, setFileName] = useState("Upload Boundary File");
  const [nameCategory, setNameCategory] = useState("");

  const handleFileUpload = async () => {
    if (fileName) {
      const formData = new FormData();
      formData.append("file", fileName);
      formData.append("name", nameCategory);
      try {
        const response = await axiosInstance.post(
          "/category/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          toast.info("Tạo loại món ăn thành công!");
          setFileName("");
          setNameCategory("");
          mutate("/category/get-all");
          return;
        }
        toast.error("Tạo loại món ăn thất bại!");
      } catch (error) {
        toast.error("Tạo loại món ăn thất bại!");
        console.log(error);
      }
    }
  };
  return (
    <>
      <h1>Thêm loại món ăn</h1>
      {/* <Button onClick={handleFileUpload}>ádsaasdasd</Button> */}
      <Card>
        <Card.Header>Có thể sửa loại món ăn. Lưu ý: hạn chế xóa</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên loại món ăn như Luộc, Xào, Hấp..."
                onChange={(e) => setNameCategory(e.target.value)}
              />
              <Form.Text className="text-muted">
                Tên loại món ăn sẽ được hiển thị trên trang web
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                Hình ảnh của loại món ăn (Lưu ý: chỉ có 1 hình)
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e: any) => setFileName(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => handleFileUpload()}>
              Tạo mới
            </Button>
          </Form>
          <ToastContainer></ToastContainer>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateCategoryPage;
