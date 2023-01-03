import React from "react";
import { useFormik } from "formik";
import { config } from "../config";
import axios from "axios";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Adminlogin() {
const navigate=useNavigate()

  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState([]);
  const [modalTwo, setModalTwo] = useState(false);

  // const [color, setColor] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let error = {};

      if (values.email === "") {
        error.email = "please enter Email";
      }
      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.email)
      ) {
        error.email = " please enter a valid email";
      }
      if (values.password === "") {
        error.password = "please enter Password";
      }
      if (
        values.password &&
        (values.password.length <= 7 || values.password.length > 12)
      ) {
        error.password = "Password must be between 8 to 12 characters";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const createAcc = await axios.post(`${config.api}/login`, values);

        if (createAcc.data.message === "Login successfully") {
          setMessage(createAcc.data.message);
        
          setModal(true);
// navigate("/shortlinks")
          formik.resetForm();
        } else {
          setModalTwo(true);
          setMessage(createAcc.data.message);
        }
      } catch (error) {
        alert("error");
      }
    },
  });
  const [passwordDispaly, setPasswordDisplay] = useState("Show");

  const [passwordType, setPasswordType] = useState("password");
  const changeType = () => {
    if (passwordType === "password") {
      setPasswordDisplay("Hide");
      setPasswordType("text");
    } else {
      setPasswordType("password");
      setPasswordDisplay("Show");
    }
  };
  const btn = () => {
    setModalTwo(false);
  };

  return (
    <>
      <div className={styles.forcenter}>
        <div className={styles.login_container}>
          <div className={styles.login_form_container}>
            <div className={styles.left}>
              <form className={styles.form_container}>
                <h1>Login Your Account</h1>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                  required
                  id={styles.input}
                  className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email ? "success-box" : ""}
   
							`}
							// ${color ? "error-box" : ""}

                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="err" style={{ color: "#ee6c4d" }}>
                    {formik.errors.email}{" "}
                  </span>
                ) : null}

                <div
                  id={styles.inputp}
                  className={`
							${formik.touched.password && formik.errors.password ? "error-box" : ""}
							${formik.touched.password && !formik.errors.password ? "success-box" : ""}

							`}
                >
                  <input
                    type={passwordType}
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                    required
                    id={styles.inputpp}
                  />
                  <span onClick={changeType} className={styles.show}>
                    {passwordDispaly}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <span className="err" style={{ color: "red" }}>
                    {formik.errors.password}{" "}
                  </span>
                ) : null}

                <button
                  onClick={formik.handleSubmit}
                  type="submit"
                  className={styles.green_btn}
                >
                  Login
                </button>
                <div className={styles.forgot_change}>
                  <Link to="/forgotpassword" className={styles.forgot}>
                    Forgot password
                  </Link>
                  <Link to="/changepassword" className={styles.forgot}>
                    Change password
                  </Link>
                </div>
              </form>
            </div>
            <div className={styles.right}>
              <h1>
                New <br />
                User ?
              </h1>
              <Link to="/signup">
                <button type="button" className={styles.white_btn}>
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {modal ? (
        <>
          <div className="forbg"></div>
          <div className="popup">
            <div className="inside-popup">
              <h2 className="h2msg">Yeah !</h2>
              <hr></hr>

              <div className="inside-popup-content">
                <div className="msg">
                  <h3 className="h3green">{message}</h3>
                </div>
                <hr></hr>

                <Link to="/shortlinks" className={styles.green_btn}>
                  Okay
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {modalTwo ? (
        <>
          <div className="forbg"></div>
          <div className="popup">
            <div className="inside-popup">
              <h2 className="h2msg">Oops!</h2>
              <hr></hr>

              <div className="inside-popup-content">
                <div className="msg">
                  <h3 className="h3red">{message}</h3>
                </div>
                <hr></hr>

                <Link onClick={btn} className={styles.green_btn}>
                  Try again
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Adminlogin;
