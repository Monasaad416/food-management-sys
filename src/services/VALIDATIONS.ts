export const emailValidation = {required:"Email is required" ,
                                    pattern:{value:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message:"please enter a valid email address"}
                                }

export const firstNameValidation = {required:"firstname is required"}       
export const lastNameValidation = {required:"lastname is required"}   
export const passwordValidation = {required:"password is required",
// pattern:/^(?=(.*[a-z]){3})(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/
}  
export const roleValidation = {required:"role is required"}                            