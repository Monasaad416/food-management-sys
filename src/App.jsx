
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './Modules/Shared/AuthLayout/AuthLayout';
import { Suspense } from 'react';
import NotFound from './Modules/Shared/NotFound/NotFound';
import Login from './Modules/Auth/Login/Login';
import Register from './Modules/Auth/Register/Register';
import ChangePassword from './Modules/Auth/ChangePassword/ChangePassword';
import ForgetPassword from './Modules/Auth/ForgetPassword/ForgetPassword';
import ResetPassword from './Modules/Auth/ResetPassword/ResetPassword';
import VerifyAccount from './Modules/Auth/VerifyAccount/VerifyAccount';
import MasterLayout from './Modules/Shared/MasterLayout/MasterLayout';
import Dashboard from './Modules/Dashboard/Dashboard';
import RecipecList from './Modules/Recipes/RecipesList/RecipecList';
import RecipeData from './Modules/Recipes/RecipeData/RecipeData';
import CategoriesList from './Modules/Categories/CategoriesList/CategoriesList';
import CategoryData from './Modules/Categories/CategoryData/CategoryData';
import UsersList from './Modules/Users/UsersList/UsersList';
import FavouritsList from './Modules/FavouritsList/FavouritsList';
import { ToastContainer } from 'react-toastify';

function App() {
     const router = createBrowserRouter([
       {
         path: "/",
         element: <AuthLayout />,
         errorElement: (
           <Suspense fallback="Loading Please Wait ...">
             <NotFound />
           </Suspense>
         ),
         children: [
           {
             index: true,
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <Login />
               </Suspense>
             ),
           },
           {
             path: "login",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <Login />
               </Suspense>
             ),
           },
           {
             path: "register",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <Register />
               </Suspense>
             ),
           },
           {
             path: "change-password",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <ChangePassword />
               </Suspense>
             ),
           },
           {
             path: "forget-password",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <ForgetPassword />
               </Suspense>
             ),
           },
           {
             path: "reset-password",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <ResetPassword />
               </Suspense>
             ),
           },
           {
             path: "verify-account",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <VerifyAccount />
               </Suspense>
             ),
           },
         ],
       },
       {
         path: "/dashboard",
         element: <MasterLayout />,
         errorElement: (
           <Suspense fallback="Loading Please Wait ...">
             <NotFound />
           </Suspense>
         ),
         children: [
           {
             index: true,
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <Dashboard />
               </Suspense>
             ),
           },
           {
             path: "recipes",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <RecipecList />
               </Suspense>
             ),
           },
           {
             path: "recipe-data",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <RecipeData />
               </Suspense>
             ),
           },
           {
             path: "categories",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <CategoriesList />
               </Suspense>
             ),
           },
           {
             path: "category-data",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <CategoryData />
               </Suspense>
             ),
           },
           {
             path: "users",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <UsersList />
               </Suspense>
             ),
           },
           {
             path: "favourits",
             element: (
               <Suspense fallback="Loading Please Wait ...">
                 <FavouritsList />
               </Suspense>
             ),
           },
         ],
       },
     ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App
