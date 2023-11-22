import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../../../State/Admin/Action";

const AddStudent = () => {
  const [firstName, firstNamechange] = useState("");
  const [lastName, lastNamechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [studentId, studentIdchange] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const userobj = { firstName, lastName, email, password, studentId };
    dispatch(FunctionAddUser(userobj));
    navigate("/teacher");
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <Link to={"/teacher"}>
          {" "}
          <button
            type="button"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
          >
            <svg
              class="w-5 h-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go back</span>
          </button>
        </Link>

        <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
          Create Student
        </h1>
        <form className="mt-6" onSubmit={handlesubmit}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Firstname
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => firstNamechange(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Lastname
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => lastNamechange(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => emailchange(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => passwordchange(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Student Id
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => studentIdchange(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
