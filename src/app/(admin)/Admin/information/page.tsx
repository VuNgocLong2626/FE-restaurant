"use client";

import axiosInstance from "@/config/axiosInstance";

const InformationPage = () => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/user/user-info");
      const data = response.data;
      console.log(data);
      // Handle the response data
    } catch (error) {
      // Handle errors
    }
  };

  //   console.log("-----------ádsdaasdasd-----", users);
  return (
    <div>
      <h1>Information Page</h1>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default InformationPage;
