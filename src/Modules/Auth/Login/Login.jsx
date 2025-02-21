import { Link, useNavigate } from 'react-router-dom';
import logo3 from '../../../assets/imgs/logo3.png'
import { THEMECOLOR } from '../../../Constants/THEME_COLORS';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_URLS } from '../../../Constants/END_POINTS';
import { toast } from 'react-toastify';
import { togglePasswordVisibility } from '../../../Utilities/TogglePasswordVisibility.js'
 
export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const passwordInputId = "password";

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(BASE_URLS.login, data);

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
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row justify-content-center align-items-center vh-100 ">
            <div className="bg-white w-50 rounded-3 px-5 py-5 mx-5">
              <div className="logo text-center">
                <img src={logo3} alt="logo" width="300" />
              </div>
              <div className="px-5 py-3">
                <h3 className="h5">Log In</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
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
                  <Link
                    to="register"
                    className="text-dark text-decoration-none"
                  >
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
                  className="btn w-100 text-white custom-button my-5 fw-bold"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
