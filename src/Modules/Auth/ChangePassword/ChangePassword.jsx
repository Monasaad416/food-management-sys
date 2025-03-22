
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { togglePasswordVisibility } from "../../../Utilities/TogglePasswordVisibility";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import { USER_URLS } from "../../../services/api/apiConfig";
import { BeatLoader } from "react-spinners";

export default function ChangePassword() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm({ mode: "onChange" });

  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");

  useEffect(() => {
    if (confirmNewPassword) {
      trigger("confirmNewPassword");
    }
  }, [newPassword, confirmNewPassword, trigger]);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await privateAxiosInstance.put(
        USER_URLS.CHANGE_PASSWORD,
        data
      );
      navigate("/dashboard");
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const passwordInputId1 = "oldPassword";
  const passwordInputId2 = "newPassword";
  const passwordInputId3 = "confirmNewPassword";

  return (
    <>
      <div className="px-5 py-4">
        <h3 className="h5">Change Password</h3>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-md-5">
        {/* Old Password */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock"></i>
            <span className="devider"></span>
          </span>

          <input
            type="password"
            id={passwordInputId1}
            className="form-control"
            placeholder="Old Password"
            aria-label="password"
            {...register("oldPassword", {
              required: "old password is required",
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
        {/* New Password */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock"></i>
            <span className="devider"></span>
          </span>

          <input
            type="password"
            id={passwordInputId2}
            className="form-control"
            placeholder="New Password"
            aria-label="newPassword"
            {...register("newPassword", {
              required: "new password is required",
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
        {/* New Password Confirmation */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock"></i>
            <span className="devider"></span>
          </span>

          <input
            type="password"
            className="form-control"
            id={passwordInputId3}
            placeholder="Confirm New Password"
            aria-label="confirmNewPassword"
            {...register("confirmNewPassword", {
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
            onClick={() => togglePasswordVisibility(passwordInputId3)}
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
            "Change Password"
          )}
        </button>
      </form>
    </>
  );
}
