import React, {
  useContext
} from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  Toaster
} from "react-hot-toast";

import Dashboard from "./pages/Dashboard.jsx";

import AdminLogin from "./pages/login/AdminLogin.jsx";
import ForgotPassword from "./pages/login/ForgotPassword.jsx";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import ChangePassword from "./pages/login/ChangePassword.jsx";

import Sidebar from "./components/Sidebar.jsx";

import AddLecture from "./pages/AddLecture.jsx";
import LectureList from "./pages/LectureList.jsx";
import EditLecture from "./pages/EditLecture.jsx";

import AddBook from "./pages/AddBook.jsx";
import AddLesson from "./pages/AddLesson.jsx";
import BookList from "./pages/BookList.jsx";

import AddTafsiir from "./pages/AddTafsiir.jsx";
import TafsiirList from "./pages/TafsiirList.jsx";

import AdminNotFound from "./pages/AdminNotFound.jsx";

import {
  AdminContext
} from "./Context/AdminContext.jsx";

const AppLayout = () => {

  const isMobile =
  window.innerWidth < 768;

  return (
    <div
      style={{
        display:"flex",
        flexDirection:
          isMobile
          ? "column"
          : "row",
        minHeight:"100vh"
      }}
    >

      <Sidebar />

      <main
        style={{
          flex:1,
          padding:"1rem",
          width:"100%",
          overflowX:"hidden"
        }}
      >

        <Routes>

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/add-lecture"
            element={<AddLecture />}
          />

          <Route
            path="/lectures"
            element={<LectureList />}
          />

          <Route
            path="/edit-lecture/:id"
            element={<EditLecture />}
          />

          <Route
            path="/add-book"
            element={<AddBook />}
          />

          <Route
            path="/add-lesson"
            element={<AddLesson />}
          />

          <Route
            path="/book-list"
            element={<BookList />}
          />

          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

          <Route
            path="/add-tafsiir"
            element={<AddTafsiir />}
          />

          <Route
            path="/tafsiir-list"
            element={<TafsiirList />}
          />

          {/* ADMIN 404 */}
          <Route
            path="*"
            element={<AdminNotFound />}
          />

        </Routes>

      </main>
    </div>
  );
};

const App = () => {

  const { aToken } =
  useContext(
    AdminContext
  );

  return (
    <>
      <Toaster
        position="top-center"
      />

      <Routes>

        <Route
          path="/login"
          element={<AdminLogin />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/*"
          element={
            aToken
            ? <AppLayout />
            : <Navigate
                to="/login"
                replace
              />
          }
        />

      </Routes>
    </>
  );
};

export default App;