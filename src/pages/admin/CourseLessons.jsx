import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { getLessons } from "../../api/lessonApi";

function CourseLessons() {
  const { id } = useParams();

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    loadLessons();
  }, [id]);

  const loadLessons = async () => {
    try {
      const data = await getLessons();
      const courseLesson = data.filter((e)=>e.courseId==id)
      setLessons(courseLesson);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Course Lessons
        </h1>

        <p className="text-slate-500">
          Total Lessons: {lessons.length}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              border
              border-slate-200
              p-5
              hover:shadow-xl
              transition
            "
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="
                  bg-purple-100
                  text-purple-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                "
              >
                Lesson {lesson.orderNumber}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-3">
              {lesson.title}
            </h2>

            <p className="text-slate-500 line-clamp-3 mb-4">
              {lesson.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                {lesson.duration}
              </span>

<a
                        href={
                          lesson.videoUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600"
                      >
                         View
                      </a>
            
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default CourseLessons;