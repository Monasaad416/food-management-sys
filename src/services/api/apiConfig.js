

export const USER_URLS = {
  LOGIN: `Users/Login`,
  REGISTER: `Users/Register`,
  FORGET_PASSWORD: `Users/Reset/Request`,
  RESET_PASSWORD: `Users/Reset`,
  CHANGE_PASSWORD: `Users/ChangePassword`,
  USERS: `Users`,
  DELETE_USER: (id) => `Users/${id}`,
  VERIFY_ACCOUNT:`/Users/verify`
};


export const CATEGORIES_URLS = {
  CATEGORIES: `Category`,
  CREATE_CATEGORY: `Category`,
  DELETE_CATEGORY: (id) => `Category/${id}`,
  GET_CATEGORY: (id) => `Category/${id}`,
  UPDATE_CATEGORY: (id) => `Category/${id}`,
};
export const RECIPES_URLS = {
  RECIPES: `Recipe`,
  DELETE_RECIPE: (id) => `/Recipe/${id}`,
  CREATE_RECIPE: `Recipe`,
  GET_RECIPE: (id) => `RECIPE/${id}`,
  UPDATE_RECIPE: (id) => `RECIPE/${id}`,
};

export const TAGS_URLS = {
  TAGS: `tag`
};
export const FAVS_URLS = {
  FAV_RECIPES: `userRecipe`,
  CREATE_FAV_RECIPE: `userRecipe`,
  DELETE_FAV_RECIPE: (id) => `/userRecipe/${id}`,
};



// let [loginData, setLoginData] = useState(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     try {
//       return jwtDecode(token); // Decode token only if it's valid
//     } catch (error) {
//       console.error("Failed to decode token during initialization:", error);
//       localStorage.removeItem("token"); // Clear invalid token
//       return null; // Return null if token is invalid
//     }
//   }
//   return null; // Return null if no token exists
// });

//   let logout = () => {
//     localStorage.removeItem("token"); // Remove token
//     setLoginData(null); // Clear state
//     console.log("Token removed and loginData cleared");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setLoginData(decodedToken); // Update state with valid token data
//       } catch (error) {
//         console.error("Invalid token:", error);
//         localStorage.removeItem("token"); // Clear invalid token
//         setLoginData(null); // Clear state
//       }
//     } else {
//       setLoginData(null); // Ensure loginData is cleared when no token exists
//     }
//   }, []); // Only runs on mount
