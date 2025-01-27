import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// UI
import { banner, profileIcon } from "../assets";

// Redux
import { useDispatch } from "react-redux";
import { showAlert } from "../store/alertSlice";
import { setGuest } from "../store/authSlice";

const Register = () => {
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();

  // Form values
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (form.password !== form.confirmPassword) {
      dispatch(showAlert({ message: "Passwords do not match", type: "error" }));
      return;
    } else if (form.password.length < 6) {
      dispatch(
        showAlert({
          message: "Password must be at least 6 characters",
          type: "error",
        }),
      );
      return;
    }

    // API Call
    try {
      setLoading(true);
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const { success, error } = await res.json();

      if (success) {
        dispatch(showAlert({ message: success, type: "success" }));
        navigate("/");
      } else {
        dispatch(showAlert({ message: error, type: "error" }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    dispatch(setGuest());
    dispatch(
      showAlert({
        message: "Logged in as a guest.",
        type: "info",
      }),
    );
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 md:flex-row md:gap-8 lg:gap-8">
      {/* Banner  */}
      <section className="space-y-4">
        <div>
          <h2 className="text-6xl font-bold text-info">Eventify</h2>
          <p className="text-sm font-semibold first-line:text-info">
            Manage your events with ease
          </p>
        </div>

        <figure className="hidden max-w-[600px] lg:block">
          <img src={banner} alt="banner" className="aspect-video rounded-lg" />
        </figure>
      </section>

      {/* Form  */}
      <form
        onSubmit={handleSubmit}
        className="h-auto w-full space-y-4 rounded-lg p-8 shadow-md md:w-[420px] md:min-w-[300px]"
      >
        <p className="text-center text-xs text-gray-500">
          Enter your details to create an account
        </p>

        {/* Name  */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>

        {/* Email  */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>

        {/* Password  */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Create Password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </label>

        {/* Confirm Password */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </label>

        {/* Submit  */}
        <button
          type="submit"
          className="btn btn-info w-full text-white"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            "Register"
          )}
        </button>

        <div>
          <p className="text-center text-sm">
            Already have an account? &nbsp;
            <Link to="/" className="link link-info">
              Login
            </Link>
          </p>
        </div>

        <div className="divider">OR</div>

        <button
          type="button"
          className="btn btn-neutral mr-auto flex w-full items-center gap-1"
          onClick={handleGuest}
        >
          <span>
            <img src={profileIcon} alt="guest" width={24} />
          </span>
          Login as a Guest
        </button>
      </form>
    </div>
  );
};

export default Register;
