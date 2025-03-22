import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { publicAxiosInstance } from "../../../services/api/apiInstance";
import { USER_URLS } from "../../../services/api/apiConfig";

export default function ForgetPassword() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await publicAxiosInstance.post(
        USER_URLS.FORGET_PASSWORD,
        data
      );

      console.log(response);
      navigate("/reset-password",{state:{email: data.email}});
      toast.success(response?.data?.message);
    } catch (error) {
        toast.error( error.message);
  
    }
  };
  return (
    <>
      <div className="px-5 py-4">
        <h3 className="h5">Forgot Your Password?</h3>
        <span className="text-muted">
          No worries! Please enter your email and we will send a
          password reset link
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-md-5">
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn w-100 text-white custom-button my-5 fw-bold"
        >
          Submit
        </button>
      </form>
    </>
  );
}
