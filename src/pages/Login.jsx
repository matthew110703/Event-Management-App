import { Link } from "react-router-dom";
import { profileIcon, banner } from "../assets";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 md:flex-row md:gap-8 lg:gap-8">
      {/* Banner */}
      <section className="space-y-4">
        <div>
          <h2 className="text-6xl font-bold text-info">Eventify</h2>
          <p className="text-sm font-semibold first-line:text-info">
            Manage your events with ease
          </p>
        </div>

        <figure className="hidden max-w-[600px] lg:block">
          <img src={banner} alt="banner" className="rounded-lg" />
        </figure>
      </section>

      {/* Form */}
      <form className="h-auto w-full space-y-4 rounded-lg p-8 shadow-md md:w-[420px] md:min-w-[300px]">
        <p className="text-center text-xs text-gray-500">
          Welcome back! Login to your account
        </p>
        {/* Email  */}
        <label className="input input-bordered flex items-center gap-2 focus-within:outline-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" />
        </label>
        {/* Password  */}
        <label className="input input-bordered flex items-center gap-2 focus-within:outline-info">
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
          <input type="password" className="grow" placeholder="••••••••" />
        </label>
        {/* Submit  */}
        <button type="submit" className="btn btn-info w-full text-white">
          Login
        </button>

        <div>
          <p className="text-center text-sm">
            Don't have an account? &nbsp;
            <Link to="#" className="link link-info">
              Register now
            </Link>
          </p>
        </div>

        <div className="divider">OR</div>

        <button
          type="button"
          className="btn btn-neutral mr-auto flex w-full items-center gap-1"
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

export default Login;
