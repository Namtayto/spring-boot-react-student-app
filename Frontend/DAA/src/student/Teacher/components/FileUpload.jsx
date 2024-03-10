import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FetchUserList } from "../../../State/Admin/Action";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5454/student/upload", formData)
      .then((response) => {
        console.log(response.data);
        // Assuming the file upload is successful, trigger a reload of the user list
        dispatch(FetchUserList({ pageNumber: 0, pageSize: 10 }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // You can perform additional actions after the file state changes
    // For example, you can display a message or perform additional logic
    if (file) {
      console.log("File selected:", file.name);
    }
  }, [file]);

  return (
    <div className="mb-20 mt-10">
      <p className="text-red-600">Add student using JSON file</p>
      <div className="flex">
        <input
          className="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
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
