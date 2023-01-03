import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
import { useState } from "react";

function Changepassword() {
  const [emailDiv, setEmailDiv] = useState(true);
  const [passwordDiv, setPasswordDiv] = useState(false);

  const [passId, setPassId] = useState("");
  const [modal, setModal] = useState(false);
  const [h3color, setH3color] = useState("");
  const [modalmsg, setModalmsg] = useState("");
  const [backing, setBacking] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
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

      return error;
    },
    onSubmit: async (values) => {
      try {
        const createAcc = await axios.post(`${config.api}/change`, values);

        if (createAcc.data.message === "id finded") {
          setPassId(createAcc.data.email);
          setEmailDiv(false);
          setPasswordDiv(true);
        }
        if (createAcc.data.message === "Account not found in this email-Id") {
          setModal(true);
          setH3color("h3red");
          setModalmsg(createAcc.data.message);
        }
      } catch (error) {
        alert("error");
      }
    },
  });
  const btn = () => {
    setModal(false);
  };

  const back = () => {
    setEmailDiv(true);
    setPasswordDiv(false);
    formikpassword.resetForm();
  };

  const formikpassword = useFormik({
    initialValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.currentpassword) {
        error.currentpassword = "please enter current password";
      }

      if (
        values.currentpassword &&
        (values.currentpassword.length <= 7 ||
          values.currentpassword.length > 12)
      ) {
        error.currentpassword = "Password must be between 8 to 12 characters";
      }
      if (values.newpassword === "") {
        error.newpassword = "please enter New password";
      }

      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter New Password again";
      }

      if (
        values.confirmpassword &&
        (values.confirmpassword.length <= 7 ||
          values.confirmpassword.length > 12)
      ) {
        error.confirmpassword = "Password must be between 8 to 12 characters";
      }
      if (
        values.newpassword &&
        (values.newpassword.length <= 7 || values.newpassword.length > 12)
      ) {
        error.newpassword = "Password must be between 8 to 12 characters";
      }
      if (
        values.newpassword.length > 7 &&
        values.confirmpassword.length > 7 &&
        values.newpassword.length < 13 &&
        values.confirmpassword.length < 13 &&
        values.newpassword !== values.confirmpassword
      ) {
        error.newpassword = "Password not matching";
        error.confirmpassword = "Password not matching";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const createAcc = await axios.post(
          `${config.api}/change/${passId}`,
          values
        );
        if (createAcc.data.message === "Password Changed Successfully") {
          setBacking(true);
          setModalmsg(createAcc.data.message);

          setH3color("h3green");
        }
        if (createAcc.data.message === "Current Password Incorrect") {
          setModal(true);
          setH3color("h3red");
          setModalmsg(createAcc.data.message);
        }
      } catch (error) {
        alert("error");
      }
    },
  });

  return (
    <>
      {emailDiv ? (
        <>
          <div className="content">
            <div className="inside-content">
              <div className="content-top">
                <div className="inside-content-top">
                  <h2>Change Password</h2>

                  <p>
                    Hi , please enter your registered <br /> mail id. Click the
                    button below to <br />
                    proceed.
                  </p>
                </div>
              </div>
              <div className="content-bottom">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  id="input"
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
                <button
                  onClick={formik.handleSubmit}
                  type="submit"
                  className="green_btn"
                >
                  proceed
                </button>
              </div>
            </div>

            <Link to="/" className="navy_btn">
              Back
            </Link>
          </div>
        </>
      ) : null}

      {passwordDiv ? (
        <>
          <div className="content">
            <div className="inside-content-green-forchange">
              <div className="content-top-green-forchange">
                <div className="inside-content-top-green-forchange">
                  <h2>Update Your Password</h2>

                  <p>please enter your Current password & New password</p>
                </div>
              </div>
              <div className="content-bottom-green-forchange">
                <input
                  type="text"
                  placeholder="Current password"
                  name="currentpassword"
                  value={formikpassword.values.currentpassword}
                  onBlur={formikpassword.handleBlur}
                  onChange={formikpassword.handleChange}
                  required
                  id="input"
                  className={`
							${
                formikpassword.touched.currentpassword &&
                formikpassword.errors.currentpassword
                  ? "error-box"
                  : ""
              }
							${
                formikpassword.touched.currentpassword &&
                !formikpassword.errors.currentpassword
                  ? "success-box"
                  : ""
              }

							`}
                />
                {formikpassword.touched.currentpassword &&
                formikpassword.errors.currentpassword ? (
                  <span className="err" style={{ color: "red" }}>
                    {formikpassword.errors.currentpassword}{" "}
                  </span>
                ) : null}

                <input
                  type="text"
                  placeholder="New password"
                  name="newpassword"
                  value={formikpassword.values.newpassword}
                  onBlur={formikpassword.handleBlur}
                  onChange={formikpassword.handleChange}
                  required
                  id="input"
                  className={`
							${
                formikpassword.touched.newpassword &&
                formikpassword.errors.newpassword
                  ? "error-box"
                  : ""
              }
							${
                formikpassword.touched.newpassword &&
                !formikpassword.errors.newpassword
                  ? "success-box"
                  : ""
              }

							`}
                />
                {formikpassword.touched.newpassword &&
                formikpassword.errors.newpassword ? (
                  <span className="err" style={{ color: "red" }}>
                    {formikpassword.errors.newpassword}{" "}
                  </span>
                ) : null}

                <input
                  type="text"
                  placeholder="Confirm new password"
                  name="confirmpassword"
                  value={formikpassword.values.confirmpassword}
                  onBlur={formikpassword.handleBlur}
                  onChange={formikpassword.handleChange}
                  required
                  id="input"
                  className={`
							${
                formikpassword.touched.confirmpassword &&
                formikpassword.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                formikpassword.touched.confirmpassword &&
                !formikpassword.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
                />
                {formikpassword.touched.confirmpassword &&
                formikpassword.errors.confirmpassword ? (
                  <span className="err" style={{ color: "red" }}>
                    {formikpassword.errors.confirmpassword}{" "}
                  </span>
                ) : null}

                <button
                  onClick={formikpassword.handleSubmit}
                  type="submit"
                  className="red-green_btn"
                >
                  proceed
                </button>
              </div>
            </div>

            <Link onClick={back} className="navy_btn">
              Back
            </Link>
          </div>
        </>
      ) : null}

      {modal ? (
        <>
          <div className="forbg"></div>
          <div className="popup">
            <div className="inside-popup">
              <h2 className="h2msg">Oops!</h2>
              <hr></hr>

              <div className="inside-popup-content">
                <div className="msg">
                  <h3 className={h3color}>{modalmsg}</h3>
                </div>
                <hr></hr>

                <button onClick={btn} className="green_btn">
                  Try again
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {backing ? (
        <>
          <div className="forbg"></div>
          <div className="popup">
            <div className="inside-popup">
              <h2 className="h2msg">Yeah!</h2>
              <hr></hr>

              <div className="inside-popup-content">
                <div className="msg">
                  <h3 className={h3color}>{modalmsg}</h3>
                </div>
                <hr></hr>

                <Link to="/" className="green_btn">
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

export default Changepassword;
