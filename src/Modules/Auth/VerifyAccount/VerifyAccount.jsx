import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { publicAxiosInstance } from "../../../services/api/apiInstance";
import { USER_URLS } from "../../../services/api/apiConfig";
import { BeatLoader } from "react-spinners";

export default function VerifyAccount() {
  const {state} = useLocation();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues: { email: state?.email } });



  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
   
      const response = await publicAxiosInstance.put(
        USER_URLS.VERIFY_ACCOUNT,
        data
      );
      toast.success(response?.data?.message);

      navigate("/dashboard");

    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <>
      <div className="px-5 py-4">
        <h3 className="h5">Verify Account</h3>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-md-5">
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
            {...register("code", {
              required: "OTP is required",
            })}
          />
        </div>
        {errors.code && (
          <p className="text-danger pb-2">{errors.code.message}</p>
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
            "Verify Account"
          )}
        </button>
      </form>
    </>
  );
}
