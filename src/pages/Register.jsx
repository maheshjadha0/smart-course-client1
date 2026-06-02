import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
export default function Register() {

  const navigate = useNavigate();
const [loading ,setLoading] = useState(false);
  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
setLoading(true);
    try {

      await registerUser(formData);

      alert("Registered Successfully");
setLoading(false);
      navigate("/");

    } catch {

      alert("Registration Failed");
      setLoading(false);
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

      <div className="
        w-16
        h-16
        mx-auto
        mb-4
        rounded-2xl
        bg-green-600
        flex
        items-center
        justify-center
        text-white
        text-2xl
        font-bold
      ">
        SC
      </div>

      <h2 className="
        text-3xl
        md:text-4xl
        font-bold
        text-slate-800
      ">
        Create Account
      </h2>

      <p className="
        text-slate-500
        mt-3
        text-sm
        md:text-base
      ">
        Start your learning journey today
      </p>

    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div>
        <label className="
          block
          text-sm
          font-semibold
          text-slate-700
          mb-2
        ">
          Full Name
        </label>

        <input
          name="fullName"
          placeholder="John Doe"
          onChange={handleChange}
          className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-300
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
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
        ">
          Email Address
        </label>

        <input
          name="email"
          type="email"
          placeholder="john@example.com"
          onChange={handleChange}
          className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-300
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
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
        ">
          Password
        </label>

        <input
          name="password"
          type="password"
          placeholder="Create Password"
          onChange={handleChange}
          className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-300
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
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
        ">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Confirm Password"
          className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-300
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      <div className="flex items-start gap-2 text-sm">

        <input
          type="checkbox"
          className="mt-1"
        />

        <span className="text-slate-600">
          I agree to the Terms of Service and Privacy Policy
        </span>

      </div>

      <button
        type="submit"
        className="
          w-full
          h-12
          rounded-xl
          bg-green-600
          hover:bg-green-700
          text-white
          font-semibold
          transition-all
        "
      >
        Create Account
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
        Already have an account?

        <Link
          to="/"
          className="
            ml-1
            text-green-600
            font-semibold
            hover:text-green-700
          "
        >
          Sign In
        </Link>
      </p>

    </form>

  </div>

</div>
    </AuthLayout>
  );
}