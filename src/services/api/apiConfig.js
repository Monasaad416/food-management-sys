

export const USER_URLS = {
  LOGIN: `Users/Login`,
  REGISTER: `Users/Register`,
  FORGET_PASSWORD: `Users/Reset/Request`,
  RESET_PASSWORD: `Users/Reset`,
  CHANGE_PASSWORD: `Users/ChangePassword`,
  USERS: `Users`,
  DELETE_USER: (id) => `User/${id}`,
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
}

export const TAGS_URLS = {
  TAGS: `tag`
};

