import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";

import styles from "./styles.module.css";

function Adminsignup() {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState([]);
  const [modalBack, setModalBack] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      otp: "",
    },
    validate: (values) => {
      let error = {};

      if (values.name === "") {
        error.name = "please enter Name";
      }
      if (values.name && (values.name.length <= 2 || values.name.length > 15)) {
        error.name = "Name must be between 3 to 15 characters";
      }
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
      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter Password again";
      }
      if (
        values.confirmpassword &&
        (values.confirmpassword.length <= 7 ||
          values.confirmpassword.length > 12)
      ) {
        error.confirmpassword = "Password must be between 8 to 12 characters";
      }

      if (
        values.password.length > 7 &&
        values.confirmpassword.length > 7 &&
        values.password.length < 13 &&
        values.confirmpassword.length < 13 &&
        values.password !== values.confirmpassword
      ) {
        error.password = "Password not matching";
        error.confirmpassword = "Password not matching";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        const createAcc = await axios.post(`${config.api}/register`, values);

        if (createAcc.data.message === "Account created successfully") {
          setModal(true);
          formik.resetForm();
          setMessage(createAcc.data.message);
        }
        if (
          createAcc.data.message === "Email-id already registered, use another"
        ) {
          setModalBack(true);
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

  const [passwordDispalyBack, setPasswordDisplayBack] = useState("Show");

  const [passwordTypeBack, setPasswordTypeBack] = useState("password");
  const changeTypeBack = () => {
    if (passwordTypeBack === "password") {
      setPasswordDisplayBack("Hide");
      setPasswordTypeBack("text");
    } else {
      setPasswordTypeBack("password");
      setPasswordDisplayBack("Show");
    }
  };

  const btn = () => {
    setModalBack(false);
  };

  return (
    <>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/">
              <button type="button" className={styles.white_btn}>
                Login
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_container}>
              <h1>
                Create <b>User</b> Account
              </h1>
              <input
                type="text"
                placeholder=" Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                id={styles.input}
                className={`
							${formik.touched.name && formik.errors.name ? "error-box" : ""}
							${formik.touched.name && !formik.errors.name ? "success-box" : ""}

							`}
              />
              {formik.touched.name && formik.errors.name ? (
                <span className="err" style={{ color: "red" }}>
                  {formik.errors.name}{" "}
                </span>
              ) : null}

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                id={styles.input}
                className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email ? "success-box" : ""}

							`}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="err" style={{ color: "red" }}>
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
              <div
                id={styles.inputp}
                className={`
							${
                formik.touched.confirmpassword && formik.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.confirmpassword && !formik.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
              >
                <input
                  type={passwordTypeBack}
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={formik.values.confirmpassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                  required
                  id={styles.inputpp}
                />
                <span onClick={changeTypeBack} className={styles.show}>
                  {passwordDispalyBack}
                </span>
              </div>
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <span className="err" style={{ color: "red" }}>
                  {formik.errors.confirmpassword}{" "}
                </span>
              ) : null}
              <button
                onClick={formik.handleSubmit}
                type="submit"
                className={styles.green_btn}
              >
                Create
              </button>
            </form>
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

                <Link to="/" className={styles.green_btn}>
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {modalBack ? (
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
                  Okay
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Adminsignup;
