// App.js

import './App.css'
import Navbar from './components/layouts/Navbar'
import LoadingGrid from './components/ui/LoadingGrid';
import SyncDataAcrossTabs from './components/utils/SyncDataAcrossTabs';
import LoadingBarComponent from './components/ui/LoadingBar';

// import Home from './components/Home';
// import About from './components/About'
// import TaskInputContainer from './components/TaskInputContainer'
// import TasksDisplayContainer from './components/TasksDisplayContainer'
// import UpdateTaskPopUp from './components/UpdateTaskPopUp'
// import ToTopButton from './components/ToTopButton';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react';
import { ToastContainer } from "react-toastify"


const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const NotFound = lazy(() => import('./components/pages/NotFound'));

const SignUp = lazy(() => import('./components/pages/auth/SignUp'));
const SignUpVerificationPending = lazy(() => import('./components/pages/auth/SignUpVerificationPending'));
const SignUpVerification = lazy(() => import('./components/pages/auth/SignUpVerification'));
const SignIn = lazy(() => import('./components/pages/auth/SignIn'));
const SignInVerificationPending = lazy(() => import('./components/pages/auth/SignInVerificationPending'));

const ForgotPassword = lazy(() => import('./components/pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/pages/auth/ResetPassword'));

const Account = lazy(() => import('./components/pages/Account'));



// const TaskInputContainer = lazy(() => import('./components/TaskInputContainer'));
// const TasksDisplayContainer = lazy(() => import('./components/TasksDisplayContainer'));
// const UpdateTaskPopUp = lazy(() => import('./components/UpdateTaskPopUp'));
// const ToTopButton = lazy(() => import('./components/ToTopButton'));



function MainLayout() {
  return (
    <>
      <>
        <SyncDataAcrossTabs />
        <LoadingBarComponent />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          closeButton
        // transition={Bounce}
        />
      </>
      <Navbar />
      <Suspense fallback={<LoadingGrid />}>
        <Outlet />
      </Suspense>
    </>
  );
}


function SignUpLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function SignInLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Home />
          ),
        },
        {
          path: 'about',
          // path: '/about', //both works
          element: (
            <About />
          ),
        },
        {
          path: 'signup',
          element: (
            <SignUpLayout />
          ),
          children: [
            {
              index: true,
              element: (
                <SignUp />
              ),
            },
            {
              path: "verification-pending",
              element: (
                <SignUpVerificationPending />
              ),
            },
            {
              path: "verification",
              element: (
                <SignUpVerification />
              ),
            },
          ]
        },
        {
          path: 'signin',
          element: (
            <SignInLayout />
          ),
          children: [
            {
              index: true,
              element: (
                <SignIn />
              ),
            },
            {
              path: "verification-pending",
              element: (
                <SignInVerificationPending />
              ),
            },
          ]
        },
        {
          path: 'forgotpassword',
          element: (
            <ForgotPassword />
          ),
        },
        {
          path: 'resetpassword',
          element: (
            <ResetPassword />
          ),
        },
        {
          path: 'account',
          element: (
            <Account />
          ),
        },
        {
          path: '*',
          element: (
            <NotFound />
          ),
        },
      ],
    },
  ],
    {
      // basename: "/action-list-v2/"
    });

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
