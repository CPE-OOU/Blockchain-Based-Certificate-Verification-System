import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { register, reset } from "../../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setLoading(false);
    }

    //redirect when logged in
    if (isSuccess || user) {
      navigate("/certificates");
      setLoading(false);
      toast.success("Login Sucessfull!!");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, isLoading, navigate, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    if (!password) {
      toast.error("Please enter password.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid email. Please check your input.");
      return;
    }

    const userData = {
      email,
      password,
    };
    setLoading(true);

    try {
      dispatch(login(userData));
    } catch (error) {
      debugger;
      if (
        error.message === "Network Error" ||
        error.message.includes("ErrConnect")
      ) {
        toast.error(
          "Unable to connect to the server. Please check your internet connection and try again."
        );
      } else if (error.message.includes("Request failed status code 401")) {
        toast.error("Incorrect email or password. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="ath-container">
      <div className="ath-header text-center">
        <div
          onClick={(e) => {
            console.log("bvcs logo");
            e.preventDefault();
            navigate("/");
          }}
          className="ath-logo"
        >
          <h1>BCVS</h1>
        </div>
      </div>
      <div className="ath-body">
        <h5 className="ath-heading title">
          Sign in <small className="tc-default">with your Account</small>
        </h5>
        <form>
          <div className="field-item">
            <div className="field-wrap">
              <input
                type="text"
                name="email"
                className="input-bordered"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field-item">
            <div className="field-wrap">
              <input
                type="password"
                name="password"
                className="input-bordered"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className="text-center"
            onClick={() => {
              console.log("Parent dey observer");
            }}
          >
            <button
              className="btn btn-primary btn-block btn-md"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit();
              }}
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="sap-text">
          <span>---</span>
        </div>

        <div className="ath-note text-center">
          Don’t have an account? Contact ICT
        </div>
      </div>
    </div>
  );
};

export default Login;
