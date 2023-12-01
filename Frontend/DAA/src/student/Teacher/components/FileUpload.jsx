import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiconfig";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${API_BASE_URL}/student/upload`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <p className="text-red-600">Add student using json file</p>
      <div className="flex mb-20">
        <input
          class="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          type="file"
          onChange={handleFileChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5"
          onClick={handleUpload}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
