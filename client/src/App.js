// import logo from './logo.svg';

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/layout/Header";
import QuickLink from "./components/pages/QuickLink";
import Footer from "./components/layout/Footer";
import NotFound from "./components/pages/NotFound";
import NewCertificate from "./components/pages/NewCertificate";
import Certificates from "./components/pages/Certificates";
import Verify from "./components/pages/Verify";
import Register from "./components/pages/Register";
// import LoginModal from "./components/pages/LoginModal";
import Login from "./components/pages/Login";
import AdminLogin from "./components/pages/AdminLogin";
import About from "./components/pages/About";
import MyCertificate from "./components/pages/MyCertificate";
import Empty from "./components/pages/Empty";

// const Layout = ({ children }) => {
//   return (
//     <div className="nk-wrap">
//       <Header />
//       <main className="nk-pages">{children}</main>
//       <Footer />
//     </div>
//   );
// };
const Layout = ({ children }) => {
  return (
    <div className="nk-wrap">
      <Header />
      <main className="nk-pages">{children}</main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <QuickLink />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <QuickLink />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/new-certificate"
            element={
              <Layout>
                <NewCertificate />
              </Layout>
            }
          />
          <Route
            path="/certificates"
            element={
              <Layout>
                <Certificates />
              </Layout>
            }
          />
          <Route
            path="/my-certificates"
            element={
              <Layout>
                <MyCertificate />
              </Layout>
            }
          />
          <Route
            path="/verify"
            element={
              <Layout>
                <Verify />
              </Layout>
            }
          />
          <Route
            path="/empty"
            element={
              <Layout>
                <Empty />
              </Layout>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
