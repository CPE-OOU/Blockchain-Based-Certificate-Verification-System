import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { register, reset } from "../../features/auth/authSlice";

const spinnerOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 9999,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const spinnerStyle = {
  color: "#fff",
  width: "3rem",
  height: "3rem",
};

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
    }

    //redirect when logged in
    if (isSuccess || user) {
      toast.success("Login Sucessfull!!");
      navigate("/certificates");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const userData = {
      email,
      password,
    };

    setLoading(true);

    setTimeout(() => {
      dispatch(login(userData));
      setLoading(false);
    }, 2000); // 2 seconds delay
  };

  if (loading) {
    return (
      <div style={spinnerOverlayStyle}>
        <Spinner animation="border" style={spinnerStyle} />
      </div>
    );
  }

  return (
    <div className="ath-container">
      <div className="ath-header text-center">
        <a href="index.html" className="ath-logo">
          <h1>BCVS</h1>
        </a>
      </div>
      <div className="ath-body">
        <h5 className="ath-heading title">
          Sign in <small className="tc-default">with your Account</small>
        </h5>
        <form action="#" onSubmit={handleSubmit}>
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
          <div className="text-center">
            <button className="btn btn-primary btn-block btn-md">
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
