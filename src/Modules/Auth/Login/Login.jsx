import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { togglePasswordVisibility } from "../../../Utilities/TogglePasswordVisibility.js";
import PropTypes from "prop-types";
import { publicAxiosInstance } from "../../../services/api/apiInstance.js";
import { USER_URLS } from "../../../services/api/apiConfig.js";
import { BeatLoader } from "react-spinners";
import { THEMECOLOR } from "../../../services/THEME_COLORS.js";


function Login({ loginData }) {
  const {
    register,
    formState: { errors,isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const passwordInputId = "password";

  const onSubmit = async (data) => {
    try {
      const response = await publicAxiosInstance.post(USER_URLS.LOGIN, data);

      localStorage.setItem("token", response.data.token);
      loginData;
      navigate("/dashboard");
      toast.success("Successfully logged in");
    } catch (error) {
        toast.error( error.message);
    }
  };

  //spinner start
  // const override = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: "green",
  // };

  //spinner end
  return (
    <>
      <div className="px-5 py-3">
        <h3 className="h5">Log In</h3>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5">
        {/* email */}
        <div className="input-group my-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-regular fa-envelope"></i>
            <span className="devider"></span>
          </span>
          <input
            {...register("email", {
              required: "email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "please enter a valid email",
              },
            })}
            type="text"
            className="form-control"
            placeholder="Enter your email"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <p className="text-danger pb-2">{errors.email.message}</p>
        )}
        {/* password */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock"></i>
            <span className="devider"></span>
          </span>

          <input
            type="password"
            className="form-control"
            id={passwordInputId}
            placeholder="Enter your password"
            aria-label="password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 5,
                message: "please enter min 5 characters",
              },
            })}
          />
          <span
            className="input-group-text toggle-password"
            id="togglePassword"
            onClick={() => togglePasswordVisibility(passwordInputId)}
          >
            <i className="fa-regular fa-eye"></i>
          </span>
        </div>
        {errors.password && (
          <p className="text-danger pb-2">{errors.password.message}</p>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/register" className="text-dark text-decoration-none">
            Register Now?
          </Link>
          <Link
            to="/forget-password"
            style={{ color: `${THEMECOLOR.mainColor}` }}
            className="text-decoration-none"
          >
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn w-100 text-white custom-button my-5 fw-bold"
        >
          {isSubmitting ? (
            <BeatLoader
              color={"white"}
              loading={true}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}

// Add prop types validation
Login.propTypes = {
  loginData: PropTypes.func.isRequired,
};
export default Login;
