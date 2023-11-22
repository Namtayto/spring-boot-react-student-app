import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FunctionAddPoint } from "../../../State/Admin/Action";

const AddPoint = () => {
  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [credits, setCredits] = useState(0);
  const [point1, setPoint1] = useState(0);
  const [point2, setPoint2] = useState(0);
  const [point3, setPoint3] = useState(0);
  const [point4, setPoint4] = useState(0);
  const [additionalFields, setAdditionalFields] = useState([]);
  const { studentId } = useParams();
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddField = () => {
    setAdditionalFields([
      ...additionalFields,
      {
        subjectId,
        subjectName,
        credits,
        point1,
        point2,
        point3,
        point4,
      },
    ]);

    // Reset state for the next field
    setSubjectId("");
    setSubjectName("");
    setCredits(0);
    setPoint1(0);
    setPoint2(0);
    setPoint3(0);
    setPoint4(0);
  };
  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = [...additionalFields];
    updatedFields[index][fieldName] = value;
    setAdditionalFields(updatedFields);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      year: year,
      subjects: additionalFields,
    };
    console.log(userObj);
    dispatch(FunctionAddPoint(userObj, studentId, semester));
    navigate("/teacher");
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <Link to={"/teacher"}>
          <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
            <svg
              className="w-5 h-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go back</span>
          </button>
        </Link>

        <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
          Add point
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4">
              <label className="block text-sm font-semibold text-gray-800">
                Semester
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <label className="block text-sm font-semibold text-gray-800">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
          {/* ... Other fields ... */}
          {additionalFields.map((field, index) => (
            <div key={index} className="mb-2">
              <div className="mt-5 mb-5 flex justify-center">
                <label className="block text-sm font-semibold text-red-500">
                  Subject {index + 1}
                </label>
              </div>

              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Subject ID
                  </label>
                  <input
                    type="text"
                    value={field.subjectId}
                    onChange={(e) =>
                      handleFieldChange(index, "subjectId", e.target.value)
                    }
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={field.subjectName}
                    onChange={(e) =>
                      handleFieldChange(index, "subjectName", e.target.value)
                    }
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <label className="block text-sm font-semibold text-gray-800">
                Credits
              </label>
              <input
                type="number"
                value={field.credits}
                onChange={(e) =>
                  handleFieldChange(index, "credits", e.target.value)
                }
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {/* ... Add other subject fields ... */}
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/4 px-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Point 1
                  </label>
                  <input
                    type="number"
                    value={field.point1}
                    onChange={(e) =>
                      handleFieldChange(index, "point1", e.target.value)
                    }
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="w-full md:w-1/4 px-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Point 2
                  </label>
                  <input
                    type="number"
                    value={field.point2}
                    onChange={(e) =>
                      handleFieldChange(index, "point2", e.target.value)
                    }
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="w-full md:w-1/4 px-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Point 3
                  </label>
                  <input
                    type="number"
                    value={field.point3}
                    onChange={(e) =>
                      handleFieldChange(index, "point3", e.target.value)
                    }
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="w-full md:w-1/4 px-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Point 4
                  </label>
                  <input
                    type="number"
                    value={field.point4}
                    onChange={(e) =>
                      handleFieldChange(index, "point4", e.target.value)
                    }
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex mt-6">
            <div className="flex-1 mr-3">
              <button
                type="button"
                onClick={handleAddField}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Add Subject
              </button>
            </div>
            <div className="flex-1 ml-3">
              <button
                type="button"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                onClick={() => handleRemoveField(0)}
              >
                Remove Subject
              </button>
            </div>
          </div>

          {/* ... Submit button ... */}
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

export default AddPoint;
