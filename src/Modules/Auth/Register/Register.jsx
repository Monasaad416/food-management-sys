import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { togglePasswordVisibility } from "../../../Utilities/TogglePasswordVisibility";
import { THEMECOLOR } from "../../../Services/THEME_COLORS";
import { publicAxiosInstance } from "../../../services/api/apiInstance";
import { USER_URLS } from "../../../services/api/apiConfig";
import { useEffect } from "react";


export default function Register() {

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm();
  const navigate = useNavigate();

    const passwordInputId1 = "password";
    const passwordInputId2 = "confirmPassword";

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = async (data) => {
    try {
      const response = await publicAxiosInstance.post(USER_URLS.REGISTER, data);

      // console.log(response);
      navigate("/verify-account", {state:{email: data.email }});
      toast.success(response?.data?.message || "Account created successfully. A verification code has been sent to your email");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div className="px-5 py-3">
        <h3 className="h5">Register</h3>
        <p className="text-muted">Welcome Back! Please details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-lg-5">
        <div className="row">
          {/* username */}
          <div className="col-md-6">
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-regular fa-envelope"></i>
                <span className="devider"></span>
              </span>
              <input
                {...register("userName", {
                  required: "username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9]*[0-9]+$/,
                    message:
                      "The userName must contain characters and end with numbers without spaces.",
                  },
                })}
                type="text"
                className="form-control"
                placeholder="username"
                aria-label="username"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.userName && (
              <p className="text-danger pb-2">{errors.userName.message}</p>
            )}
          </div>
          {/* email */}
          <div className="col-md-6">
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
                placeholder="email"
                aria-label="email"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.email && (
              <p className="text-danger pb-2">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="row">
          {/* country */}
          <div className="col-md-6">
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-regular fa-envelope"></i>
                <span className="devider"></span>
              </span>
              <input
                {...register("country", {
                  required: "country is required",
                })}
                type="text"
                className="form-control"
                placeholder="country"
                aria-label="country"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.country && (
              <p className="text-danger pb-2">{errors.country.message}</p>
            )}
          </div>
          {/* phonenumber */}
          <div className="col-md-6">
            <div className="input-group my-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-regular fa-envelope"></i>
                <span className="devider"></span>
              </span>
              <input
                {...register("phoneNumber", {
                  required: "phoneNumber is required",
                  pattern: {
                    value: /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g,
                    message: "please enter a valid phoneNumber",
                  },
                })}
                type="text"
                className="form-control"
                placeholder="phoneNumber"
                aria-label="phoneNumber"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-danger pb-2">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        <div className="row">
          {/*  Password */}
          <div className="col-md-6">
            <div className="input-group my-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
                <span className="devider"></span>
              </span>

              <input
                type="password"
                id={passwordInputId1}
                className="form-control"
                placeholder="Password"
                aria-label="password"
                {...register("password", {
                  required: "new password is required",
                  minLength: {
                    value: 5,
                    message: "please enter min 5 characters",
                  },
                })}
              />
              <span
                className="input-group-text"
                onClick={() => togglePasswordVisibility(passwordInputId1)}
              >
                <i className="fa-regular fa-eye"></i>
              </span>
            </div>
            {errors.password && (
              <p className="text-danger pb-2">{errors.password.message}</p>
            )}
          </div>
          {/*  Password Confirmation */}
          <div className="col-md-6">
            <div className="input-group my-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
                <span className="devider"></span>
              </span>

              <input
                type="password"
                className="form-control"
                id={passwordInputId2}
                placeholder="Confirm Password"
                aria-label="confirmPassword"
                {...register("confirmPassword", {
                  required: "confirm password is required",
                  minLength: {
                    value: 5,
                    message: "please enter min 5 characters",
                  },
                  validate: (confirmPassword) => {
                    confirmPassword === watch("password") ||
                      "Passwords do not match";
                  },
                })}
              />
              <span
                className="input-group-text"
                onClick={() => togglePasswordVisibility(passwordInputId2)}
              >
                <i className="fa-regular fa-eye"></i>
              </span>
            </div>
            {errors.password && (
              <p className="text-danger pb-2">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="row">
          {/* profileImage */}
          <div className="col">
            <div className="input-group my-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
                <span className="devider"></span>
              </span>

              <input
                type="file"
                className="form-control"
                aria-label="profileImage"
                {...register("profileImage")}
              />
            </div>
            {errors.profileImage && (
              <p className="text-danger pb-2">{errors.profileImage.message}</p>
            )}
          </div>
        </div>

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
          Register
        </button>
      </form>
    </>
  );
}
