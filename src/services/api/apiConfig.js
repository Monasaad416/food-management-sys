

export const USER_URLS = {
    LOGIN: `Users/Login`,
    REGISTER: `Users/Register`,
    FORGET_PASSWORD: `Users/Reset/Request`,
    RESET_PASSWORD: `Users/Reset`, 
    CHANGE_PASSWORD: `Users/ChangePassword`
}


export const CATEGORIES_URLS = {
  CATEGORIES: `Category/?pageSize=10&pageNumber=1`,
  DELETE_CATEGORY: (id) => `Category/${id}`,
  CREATE_CATEGORY: `Category`,
};
export const RECIPES_URLS = {
    RECIPES: `Recipe/?pageSize=10&pageNumber=1`,
    DELETE_RECIPE: (id) => `/Recipe/${id}`,
}
