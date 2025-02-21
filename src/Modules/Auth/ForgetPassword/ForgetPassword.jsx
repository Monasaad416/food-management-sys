import axios from "axios";
import { useForm } from "react-hook-form";
import { BASE_URLS } from "../../../Constants/END_POINTS";
import { toast } from "react-toastify";
import logo3 from "../../../assets/imgs/logo3.png";
import { useNavigate } from "react-router-dom";


export default function ForgetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(BASE_URLS.forgetPassword, data);

      console.log(response);
      navigate("/reset-password");
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
                <h3 className="h5">Forgot Your Password?</h3>
                <span className="text-muted">
                  No worries! Please enter your email and we will send a
                  password reset link
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="px-5">
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
                  className="btn w-100 text-white custom-button my-5 fw-bold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
