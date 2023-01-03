import React from "react";
import { useFormik } from "formik";
import { config } from "../config";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [emailDiv, setEmailDiv] = useState(true);
  const [passId, setPassId] = useState("");
  const [otpDiv, setOtpDiv] = useState(false);
  const [passwordDiv, setPasswordDiv] = useState(false);
  const [modal, setModal] = useState(false);
  const [h3color, setH3color] = useState("");
  const [modalmsg, setModalmsg] = useState("");
  const [modalback, setModalback] = useState("");

  const formikEmail = useFormik({
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
        const createAcc = await axios.post(`${config.api}/forgot`, values);
        // console.log(createAcc)

        if (createAcc.data.message === "id finded") {
          setPassId(createAcc.data.email);

          setEmailDiv(false);
          setOtpDiv(true);
          setPasswordDiv(false);
        }
        if (createAcc.data.message === "Account not found in this email-Id") {
          setModal(true);
          setH3color("h3red");
          setModalmsg(createAcc.data.message);
        }
        // formik.resetForm();
      } catch (error) {
        alert("error");
      }
    },
  });

  const formikOtp = useFormik({
    initialValues: {
      otp: "",
    },
    validate: (values) => {
      let error = {};

      if (values.otp === "") {
        error.otp = "please enter Otp";
      }
      
      if (values.otp.length>=1 && values.otp.length !=5) {
        error.otp = "please enter correct Otp";
      }
      
      return error;
    },
    onSubmit: async (values) => {
      try {
        const createAcc = await axios.post(`${config.api}/forgot/otp/${passId}`, values);
        // console.log(createAcc)

        if (createAcc.data.message === "OTP correct") {
          setOtpDiv(false);

          setPasswordDiv(true);
        formikOtp.resetForm();

        }
        // setStoreOtp("");
        if (createAcc.data.message === "OTP incorrect") {
          setModal(true);
          setH3color("h3red");
          setModalmsg(createAcc.data.message);
        }
        // formik.resetForm();
      } catch (error) {
        alert("error");
      }
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      newpassword: "",
            confirmpassword: "",
            email: "",
    },
    validate: (values) => {
      let error = {};

      if (values.newpassword === "") {
        error.newpassword = "please enter new password";
      }
      
      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter new password again";
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
        const createAcc = await axios.post(`${config.api}/forgot/otp/new_password/${passId}`, values);
        // console.log(createAcc)

        if (createAcc.data.message === "Password Created Successfully") {
          setModalback(true);
          setH3color("h3green");
          setModalmsg(createAcc.data.message);
        formikPassword.resetForm();

        }
        formikPassword.resetForm();
      } catch (error) {
        alert("error");
      }
    },
  });

  const back = () => {
    setEmailDiv(true);
    setOtpDiv(false);
    setPasswordDiv(false);
  };

  const btn = () => {
    setModal(false);
  };
  return (
    <>
      {emailDiv ? (
        <>
          <div className="content">
            <div className="inside-content">
              <div className="content-top">
                <div className="inside-content-top">
                  <h2>Forgot Password</h2>

                  <p>
                    Hi , please enter your registered <br /> mail id. Click the
                    button below to <br />
                    proceed , OTP has been sended to email
                  </p>
                </div>
              </div>
              <div className="content-bottom">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                onBlur={formikEmail.handleBlur}
                value={formikEmail.values.email}
                  onChange={formikEmail.handleChange}
                  required
                  id="input"
                  className={`
							${formikEmail.touched.email && formikEmail.errors.email ? "error-box" : ""}
							${formikEmail.touched.email && !formikEmail.errors.email ? "success-box" : ""}

							`}
                />
                {formikEmail.touched.email && formikEmail.errors.email ? (
                  <span className="err" style={{ color: "red" }}>
                    {formikEmail.errors.email}{" "}
                  </span>
                ) : null}
                <button
                  onClick={formikEmail.handleSubmit}
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

      {otpDiv ? (
        <>
          <div className="content">
            <div className="inside-content">
              <div className="content-top-red">
                <div className="inside-content-top">
                  <h2>OTP</h2>

                  <p>
                    Hi , please enter your Received <br /> OTP. Click the button
                    below to <br />
                    proceed , to change your password
                  </p>
                </div>
              </div>
              <div className="content-bottom">
                <input
                  type="text"
                  placeholder="OTP"
                  name="otp"
                  value={formikOtp.values.otp}
                  onChange={formikOtp.handleChange}
                onBlur={formikOtp.handleBlur}
                  required
                  id="input"
                  className={`
                  ${formikOtp.touched.otp && formikOtp.errors.otp ? "error-box" : ""}
                  ${formikOtp.touched.otp && !formikOtp.errors.otp ? "success-box" : ""}
    
                  `}
                />
               {formikOtp.touched.otp && formikOtp.errors.otp ? (
                  <span className="err" style={{ color: "red" }}>
                    {formikOtp.errors.otp}{" "}
                  </span>
                ) : null}

                <button
                  onClick={formikOtp.handleSubmit}
                  type="submit"
                  className="red_btn"
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
      {passwordDiv ? (
        <>
          <div className="content">
            <div className="inside-content">
              <div className="content-top-green">
                <div className="inside-content-top-green">
                  <h2>Create Your Password</h2>

                  <p>
                    Hi , please enter your New password. <br /> Click the button
                    below to proceed .
                  </p>
                </div>
              </div>
              <div className="content-bottom-green">
                <input
                  type="text"
                  placeholder="New Password"
                  name="newpassword"
                  value={formikPassword.values.newpassword}
                  onChange={formikPassword.handleChange}
                  // onChange={(e)=>touching(e)}
                  onBlur={formikPassword.handleBlur}
                  required
                  id="input"
                  className={`
							${formikPassword.touched.newpassword && formikPassword.errors.newpassword ? "error-box" : ""}
							${formikPassword.touched.newpassword && !formikPassword.errors.newpassword ? "success-box" : ""}

							`}
                />
                 {formikPassword.touched.newpassword && formikPassword.errors.newpassword ? (
                  <span className="err" style={{ color: "red" }}>
                    {formikPassword.errors.newpassword}{" "}
                  </span>
                ) : null}
                <input
                  type="text"
                  placeholder="Confirm New Password"
                  name="confirmpassword"
                  value={formikPassword.values.confirmpassword}
                  onBlur={formikPassword.handleBlur}
                  onChange={formikPassword.handleChange}
                  required
                  id="input"
                  className={`
                  ${formikPassword.touched.confirmpassword && formikPassword.errors.confirmpassword ? "error-box" : ""}
                  ${formikPassword.touched.confirmpassword && !formikPassword.errors.confirmpassword ? "success-box" : ""}
    
                  `}
                />
                 {formikPassword.touched.confirmpassword && formikPassword.errors.confirmpassword ? (
                  <span className="err" style={{ color: "red" }}>
                    {formikPassword.errors.confirmpassword}{" "}
                  </span>
                ) : null}
                <button
                  onClick={formikPassword.handleSubmit}
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

                <Link onClick={btn} className="green_btn">
                  Try again
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {modalback ? (
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

export default ForgotPassword;
