import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form } from "react-bootstrap";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  lengthData: number;
  partion: number;
  setPartion: (partion: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  lengthData,
  partion,
  setPartion,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "5";

  return (
    <div className="d-flex gap-2 align-items-center mb-3 justify-content-end">
      <Form.Group
        // className="d-flex col-auto ms-sm-auto mb-3 align-items-center mb-3 justify-content-end"
        controlId="formBasicSelect"
      >
        <Form.Label className="me-2">Số lượng</Form.Label>
        <Form.Control
          as="select"
          className="d-inline-block w-auto form-select"
          value={partion}
          onChange={(e) => {
            console.log("e.target.value", e.target.value);
            setPartion(parseInt(e.target.value));
          }}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </Form.Control>
      </Form.Group>
      <Button
        variant="dark"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `/Admin/category-admin/?page=${
              Number(page) - 1
            }&per_page=${partion}`
          );
        }}
      >
        Trang trước
      </Button>

      <div>
        {page} / {Math.ceil(lengthData / Number(partion))}
      </div>

      <Button
        variant="dark"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/Admin/category-admin/?page=${
              Number(page) + 1
            }&per_page=${partion}`
          );
        }}
      >
        Trang tiếp theo
      </Button>
    </div>
  );
};

export default PaginationControls;
