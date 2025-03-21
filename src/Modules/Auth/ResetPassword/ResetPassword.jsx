
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { togglePasswordVisibility } from "../../../Utilities/TogglePasswordVisibility";
import { useEffect } from "react";
import { publicAxiosInstance } from "../../../services/api/apiInstance";
import { USER_URLS } from "../../../services/api/apiConfig";
import { BeatLoader } from "react-spinners";

export default function ResetPassword() {
  const state = useLocation();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm({ defaultValues: { email: state?.email } }, { mode: "onChange" });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await publicAxiosInstance.post(
        USER_URLS.RESET_PASSWORD,
        data
      );

      console.log(response);
      navigate("/dashboard");
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
      });
    }
  };

  const passwordInputId1 = "newPassword";
  const passwordInputId2 = "confirmPassword";

  return (
    <>
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
        {errors.seed && (
          <p className="text-danger pb-2">{errors.seed.message}</p>
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
            "Reset Password"
          )}
        </button>
      </form>
    </>
  );
}
