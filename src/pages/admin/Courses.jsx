import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getCourses, deleteCourse } from "../../api/courseApi";

import CourseModal from "../../components/CourseModal";

import { getCategories } from "../../api/categoryApi";
import { useNavigate } from "react-router-dom";


function Courses() {
  const [courses, setCourses] = useState([]);
const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState(null);

  const loadCourses = async () => {
    try {
      const data = await getCourses();

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCourses();

    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await deleteCourse(id);

      loadCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()),
  );
 const editCourse =async (data)=>{
  setShowModal(true);
  setSelectedCourses(data);
 }


 return (
  <AdminLayout>
    {/* Header */}
   {/* Header */}

<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">

  <div>

    <h1 className="text-4xl font-bold text-slate-900">
      Courses
    </h1>

    <p className="text-slate-500 mt-2">
      Create, manage and publish courses
    </p>

  </div>

  <button
    onClick={() => setShowModal(true)}
    className="
      bg-purple-600
      hover:bg-purple-700
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
    "
  >
    + Create Course
  </button>

</div>

{/* Search */}

<div className="mb-6">

  <input
    type="text"
    placeholder="Search courses..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      md:w-96
      px-5
      py-3
      rounded-xl
      border
      border-slate-300
      bg-white
      focus:ring-4
      focus:ring-purple-200
      focus:border-purple-500
      outline-none
    "
  />

</div>

{/* Course Table */}

<div
  className="
    bg-white
    rounded-3xl
    shadow-xl
    border
    border-slate-200
    overflow-hidden
  "
>

  <div className="overflow-x-auto">

    <table className="w-full min-w-[1000px]">

      <thead className="bg-slate-50">

        <tr>

          <th className="px-6 py-5 text-left font-semibold text-slate-600">
            Course
          </th>

          <th className="px-6 py-5 text-left font-semibold text-slate-600">
            Category
          </th>

          <th className="px-6 py-5 text-left font-semibold text-slate-600">
            Price
          </th>

          <th className="px-6 py-5 text-center font-semibold text-slate-600">
            Status
          </th>

          <th className="px-6 py-5 text-center font-semibold text-slate-600">
            Actions
          </th>

        </tr>

      </thead>

      <tbody>

        {filteredCourses.map((course) => (

         <tr
  key={course.id}
 
  className="cursor-pointer border-t hover:bg-slate-50"
>

            {/* Thumbnail + Title */}

            <td className="px-6 py-5">

              <div className="flex items-center gap-4">

                <img
                  src={
                    course.thumbnailUrl ||
                    "https://placehold.co/120x80"
                  }
                  alt=""
                  className="
                    w-28
                    h-16
                    rounded-xl
                    object-cover
                    shadow
                  "
                />

                <div>

                  <h3 
                  onClick={() => navigate(`/admin/courses/${course.id}`)}
                   className="font-semibold text-slate-800 cursor-pointer hover:text-purple-600"
                  >
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Course ID #{course.id}
                  </p>

                </div>

              </div>

            </td>

            {/* Category */}

            <td className="px-6 py-5">

              <span
                className="
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                "
              >
                {course.categoryName}
              </span>

            </td>

            {/* Price */}

            <td className="px-6 py-5 font-semibold text-green-600">
              ₹{course.price}
            </td>

            {/* Status */}

            <td className="px-6 py-5 text-center">

              <span
                className="
                  bg-green-100
                  text-green-700
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                "
              >
                Published
              </span>

            </td>

            {/* Actions */}

            <td className="px-6 py-5">

              <div className="flex justify-center gap-3">

                <button
                  onClick={() => editCourse(course)}
                  className="
                    bg-amber-500
                    hover:bg-amber-600
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    font-medium
                    shadow
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(course.id)}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    font-medium
                    shadow
                    transition
                  "
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

{/* Modal */}

{showModal && (
  <CourseModal
    categories={categories}
    onClose={() => {
      setShowModal(false);
      setSelectedCourses(null);
    }}
    onSuccess={() => {
      loadCourses();
      setShowModal(false);
      setSelectedCourses(null);
    }}
    course={selectedCourses}
  />
)}
  </AdminLayout>
);
}

export default Courses;
