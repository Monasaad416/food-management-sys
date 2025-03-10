import React from 'react'

export default function VerifyAccount() {
  return (
    <div>
            <div className="px-5 py-4">
              <h3 className="h5">Verify Account</h3>
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
             
    
      
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-100 text-white custom-button my-5 fw-bold"
              >
                Reset Password
              </button>
            </form>
    </div>
  )
}
