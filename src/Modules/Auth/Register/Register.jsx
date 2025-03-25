import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { togglePasswordVisibility } from "../../../Utilities/TogglePasswordVisibility";
import { USER_URLS } from "../../../services/api/apiConfig";
import { useEffect, useState } from "react";
import {  publicAxiosInstance } from "../../../services/api/apiInstance";
import { THEMECOLOR } from "../../../services/THEME_COLORS";


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

          const formData = new FormData();
          for (let key in data) {
            if (key === "profileImage") {
              formData.append(key, data?.[key]?.[0]);
            } else {
              formData.append(key, data[key]);
            }

            console.log(formData);
          }
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

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleDrop = (e) => {
      e.preventDefault(); // Prevent the default browser behavior (e.g., opening the file).
      const files = Array.from(e.dataTransfer.files); // Extract the dropped files.
      setSelectedFiles((prev) => [...prev, ...files]); // Add files to state.
    };

    const handleDragOver = (e) => {
      e.preventDefault(); // Allow the drop action.
    };

    const handleFileSelection = (e) => {
      const files = Array.from(e.target.files); // For manual file selection via input.
      setSelectedFiles((prev) => [...prev, ...files]);
    };


  return (
    <>
      <div className="px-5 py-3">
        <h3 className="h5">Register</h3>
        <p className="text-muted">Welcome Back! Please details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-lg-2">
        <div className="row">
          {/* username */}
          <div className="col-md-6">
            <div className="input-group my-1">
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
                  maxLength: {
                    value: 8, // Maximum of 8 characters
                    message: "The userName must not exceed 8 characters.",
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
            <div className="input-group my-1">
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
            <div className="input-group my-1">
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
            <div className="input-group my-1">
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
            <div className="input-group my-1">
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
            <div className="input-group my-1">
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
            <div className="input-group my-1">
              <div>
                {/* Drag and Drop Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    border: "2px dashed #26a965",
                    backgroundColor: "#e3f2ea",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    margin: "20px",
                  }}
                  className=""
                >
                  <p className="d-inline">Drag & drop or </p>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="fileInput"
                    onChange={handleFileSelection}
                  />
                  <label
                    htmlFor="fileInput"
                    style={{
                      display: "inline",
                      color: "#009247",
                    }}
                  >
                    Choose an item image{" "}
                  </label>

                  <p className="d-inline"> to upload.</p>
                </div>

                {/* Display Uploaded Files */}
                <div>
                  <h4>Uploaded Files:</h4>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <div key={index}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
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
