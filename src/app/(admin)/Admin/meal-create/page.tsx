"use client";

import axiosInstance from "@/config/axiosInstance";
import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import useSWR, { mutate } from "swr";

const CreateMealPage = () => {
  const [fileName, setFileName] = useState<File[]>([]);
  const [nameCategory, setNameCategory] = useState("");
  const [nameMeal, setNameMeal] = useState("");
  const [price, setPrice] = useState(0);

  const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

  const { data, error } = useSWR("/category/get-all", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFileName(selectedFiles);
  };

  const handleFileUpload = async () => {
    console.log(fileName);
    if (fileName && Array.isArray(fileName)) {
      const formData = new FormData();
      //   formData.append("files", fileName);
      fileName.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("id_category", nameCategory);
      formData.append("name", nameMeal);
      formData.append("price", price.toString());

      try {
        const response = await axiosInstance.post("/meal/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("ahihihi");

        setFileName([]);
        setNameCategory("");
        setNameMeal("");
        setPrice(0);
        toast.info("Tạo loại món ăn thành công!");

        return;
      } catch (error) {
        toast.error("Tạo thất bại vui lòng kiểm tra thông tin");

        console.log(error);
      }
    }
  };
  return (
    <>
      <h1>Thêm món ăn</h1>
      {/* <Button onClick={handleFileUpload}>ádsaasdasd</Button> */}
      <Card>
        <Card.Header>Có thể sửa món ăn. Lưu ý: hạn chế xóa</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên món ăn như Luộc, Xào, Hấp..."
                onChange={(e) => setNameMeal(e.target.value)}
              />
              <Form.Text className="text-muted">
                Tên món ăn sẽ được hiển thị trên trang web
              </Form.Text>
            </Form.Group>

            <Form.Label className="me-2">Số lượng</Form.Label>
            <Form.Control
              as="select"
              //   value={data?.[0]?.id}
              onChange={(e) => {
                setNameCategory(e.target.value);
              }}
            >
              <option value=""></option>
              {data?.map((data: any) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Form.Control>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Giá tiền</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập giá tiền"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                Hình ảnh của món ăn (Lưu ý: chỉ có 1 hình)
              </Form.Label>
              <Form.Control type="file" onChange={handleFileChange} multiple />
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

export default CreateMealPage;
