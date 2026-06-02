import { useState } from "react";
import { loginUser } from "../../services/authService"; 
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import Loading from "../../components/Loading";
export default function Login() {

  const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
setLoading(true);
    try {

      const response =
        await loginUser(formData);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        
        "email",
        response.data.email
      );
setLoading(false);
      navigate("/admin/dashboard");

    } catch {
 setLoading(false)
      alert("Invalid credentials");
    }
  };


    if (loading) {
    return <Loading text="Loading ..." />;
  }

  return (

  <AuthLayout>

 <div className="w-full max-w-lg mx-auto">

  <div className="
    bg-white
    rounded-3xl
    shadow-2xl
    border
    border-slate-100
    p-8
    md:p-10
  ">

    <div className="text-center mb-8">

      

      <h2 className="
        text-3xl
        md:text-4xl
        font-bold
        text-slate-800
      ">
        Welcome Back
      </h2>

      <p className="
        text-slate-500
        mt-3
        text-sm
        md:text-base
      ">
        Sign in to continue your learning journey
      </p>

    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>
        <label className="
          block
          text-sm
          font-semibold
          text-slate-700
          text-left
          mb-2
          
        ">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          placeholder="john@example.com"
          onChange={handleChange}
          className="
            w-full
            h-9
            rounded-2xl
            border
            border-slate-300
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />
      </div>

      <div>
        <label className="
          block
          text-sm
          font-semibold
          text-slate-700
          mb-2
          text-left
        ">
          Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="••••••••"
          onChange={handleChange}
          className="
            w-full
            h-9
            rounded-xl
            border
            border-slate-300
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />
      </div>

      <div className="
        flex
        items-center
        justify-between
        text-sm
      ">
        <label className="
          flex
          items-center
          gap-2
          text-slate-600
        ">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="
            text-blue-600
            font-medium
            hover:text-blue-700
          "
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="
          w-full
          h-12
          rounded-xl
          bg-blue-600
          text-white
          font-semibold
          hover:bg-blue-700
          transition-all
          duration-200
        "
      >
        Sign In
      </button>

      <div className="relative">

        <div className="
          absolute
          inset-0
          flex
          items-center
        ">
          <div className="
            w-full
            border-t
            border-slate-200
          " />
        </div>

        <div className="
          relative
          flex
          justify-center
        ">
          <span className="
            bg-white
            px-4
            text-sm
            text-slate-500
          ">
            OR
          </span>
        </div>

      </div>

      <p className="
        text-center
        text-sm
        text-slate-600
      ">
        Don't have an account?

        <Link
          to="/register"
          className="
            ml-1
            text-blue-600
            font-semibold
            hover:text-blue-700
          "
        >
          Create Account
        </Link>
      </p>

    </form>

  </div>

</div>

</AuthLayout>
  );
}