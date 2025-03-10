import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { togglePasswordVisibility } from "../../../Utilities/TogglePasswordVisibility";
import { THEMECOLOR } from "../../../Services/THEME_COLORS";
import { publicAxiosInstance } from "../../../services/api/apiInstance";
import { USER_URLS } from "../../../services/api/apiConfig";


export default function Register() {
  const {
    register,
    formState: { errors,isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const passwordInputId = "password";

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await publicAxiosInstance.post(USER_URLS.REGISTER, data);

      console.log(response);
      navigate("/dashboard");
      toast.success("Successfully logged in");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error);
        toast.error("Axios Error:", error, {
          theme: "colored",
        });
      } else {
        console.error("Unexpected Error:", error);
        toast.error("Unexpected Error:", error, {
          theme: "colored",
        });
      }
    }
  };
  return (
    <>
      <div className="px-5 py-3">
        <h3 className="h5">Register</h3>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5">
        <div className="row">
          <div className="col-6">
            {/* username */}
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-regular fa-envelope"></i>
                <span className="devider"></span>
              </span>
              <input
                {...register("username", {
                  required: "username is required",
                  //  pattern: {
                  //    value:
                  //      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  //    message: "please enter a valid username",
                  //  },
                })}
                type="text"
                className="form-control"
                placeholder="Enter your username"
                aria-label="username"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.username && (
              <p className="text-danger pb-2">{errors.username.message}</p>
            )}
          </div>

          <div className="col-6">
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
          </div>
        </div>

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
          <Link to="register" className="text-dark text-decoration-none">
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
          Login
        </button>
      </form>
    </>
  );
}
