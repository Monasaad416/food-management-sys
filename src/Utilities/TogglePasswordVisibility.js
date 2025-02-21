// utils.js
export const togglePasswordVisibility = (passwordInputId) => {
  const passwordInput = document.querySelector(`#${passwordInputId}`);
  if (!passwordInput) {
    console.error(`Element with ID ${passwordInputId} not found.`);
    return;
  }
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
};
