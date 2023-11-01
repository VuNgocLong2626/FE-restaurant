"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import axiosInstance from "@/config/axiosInstance";
import { toast } from "react-toastify";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Home() {
  const [content, setContent] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];
  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };
  const { data: session } = useSession();
  const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

  const { data, error } = useSWR("/about/getAll", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handlerSubmit = async () => {
    try {
      // if (!session?.id) return;
      const idAcount = session?.user?.id as string;
      console.log(idAcount);
      // const idAcount = localStorage.getItem("id");
      if (!idAcount) return;
      if (!content) return;

      const response = await axiosInstance.post("/about/create", {
        content: content,
        id: idAcount,
      });
      toast.info("Thêm thành công!");
      mutate("/about/getAll");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1>Thông tin trang web đang được hiển thị</h1>
        <div
          className="product-des border m-5 d-block"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>
      </div>
      <div>
        <h3>Tạo hoặc cập nhập thông tin về trang web</h3>
        <QuillEditor
          value={content}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className="w-full h-[90%] mt-10 bg-white"
        />
        <Button className="btn-m" onClick={handlerSubmit}>
          Tạo thông tin
        </Button>
      </div>
      <div>
        <h3>Thông tin sẽ đc hiển thị trang web</h3>
        <div
          className="product-des border m-5 d-block"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        {}
      </div>
    </>
  );
}
