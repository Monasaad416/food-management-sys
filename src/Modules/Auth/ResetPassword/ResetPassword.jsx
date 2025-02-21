import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URLS } from "../../../Constants/END_POINTS";
import { toast } from "react-toastify";
import logo3 from "../../../assets/imgs/logo3.png";
import { togglePasswordVisibility } from "../../../Utilities/TogglePasswordVisibility";

export default function ResetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(BASE_URLS.resetPassword, data);

      console.log(response);
      navigate("/dashboard");
      toast.success(response?.data?.message);
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

  const passwordInputId1 = "newPassword";
  const passwordInputId2 = "confirmPassword";

  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row justify-content-center align-items-center vh-100 ">
            <div className="bg-white w-50 rounded-3 px-5 py-5 mx-5">
              <div className="logo text-center">
                <img src={logo3} alt="logo" width="300" />
              </div>
              <div className="px-5 py-4">
                <h3 className="h5">Reset Password</h3>
                <span className="text-muted">
                  Please Enter Your Otp or Check Your Inbox
                </span>
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
                {/* OTP */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                    <span className="devider"></span>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    aria-label="otp"
                    {...register("seed", {
                      required: "OTP is required",
                    })}
                  />
             
                </div>
                {errors.password && (
                  <p className="text-danger pb-2">{errors.password.message}</p>
                )}
                {/* New Password */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                    <span className="devider"></span>
                  </span>

                  <input
                    type="password"
                    id={passwordInputId1}
                    className="form-control"
                    placeholder="New Password"
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
                {/* New Password Confirmation */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                    <span className="devider"></span>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    id={passwordInputId2}
                    placeholder="Confirm New Password"
                    aria-label="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm new password is required",
                      minLength: {
                        value: 5,
                        message: "please enter min 5 characters",
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

                <button
                  type="submit"
                  className="btn w-100 text-white custom-button my-5 fw-bold"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
