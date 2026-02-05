import axios from "axios";
import React, { useState } from "react";
import "./ForgetPassword.css";

function ForgetPassword() {
  const [email, setemail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [error, seterror] = useState("");
  const [message, setmessage] = useState("");
  const [securityAnswer, setsecurityAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [matchError, setMatchError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const checkStrength = (pass) => {
    if (pass.length <= 3) return "Weak";
    if (pass.length <= 6) return "Medium";
    if (pass.length >= 8) return "Strong";
    return "Medium";
  };

  const handlePasswordRest = async (e) => {
    e.preventDefault();

    // if (!email || !newpassword || !confirmpassword || !securityAnswer) {
    //   seterror("All fields are required");
    //   setmessage("");
    //   return;
    // }
    const errs = {};

    if (!email) errs.email = true;
    if (!newpassword) errs.newpassword = true;
    if (!confirmpassword) errs.confirmpassword = true;
    if (!securityAnswer) errs.securityAnswer = true;

    setFieldErrors(errs);

    if (Object.keys(errs).length) {
      seterror("Please fill all required fields");
      return;
    }

    // if (newpassword !== confirmpassword) {
    //   seterror("passwords do not match");
    //   setmessage("");
    //   return;
    // }
    try {
      const payload = {
        email,
        newpassword,
        securityAnswer,
      };
      setLoading(true);

      const url = "http://localhost:5000/api/users/recover-password";
      const response = await axios.post(url, payload);
      setmessage(response.data.message);
      seterror("");
      setemail("");
      setNewpassword("");
      setconfirmpassword("");
      setsecurityAnswer("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      setLoading(false);
    } catch (err) {
      seterror(err.response?.data?.error || "Password reset failed");
      setmessage("");
      setLoading(false);
    }
  };

  // return (
  //   <div>
  //     <h2>Forget Password</h2>
  //     {error && <p className="error">{error}</p>}
  //     {message && <p className="success">{message}</p>}

  //     <form onSubmit={handlePasswordRest}>
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setemail(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="New Password"
  //         value={newpassword}
  //         onChange={(e) => setNewpassword(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Confirm Password"
  //         value={confirmpassword}
  //         onChange={(e) => setconfirmpassword(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         placeholder="Security Answer"
  //         value={securityAnswer}
  //         onChange={(e) => setsecurityAnswer(e.target.value)}
  //       />
  //       <button type="submit">Reset Password</button>
  //     </form>
  //   </div>
  // );
  return (
    <div className="forget-page">
      {/* <div className="forget-card"> */}
      <div className={`forget-card ${error ? "shake" : ""}`}>
        <h2>Reset Password</h2>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <form onSubmit={handlePasswordRest}>
          <div className="input-box-tx">
            <input
              className={fieldErrors.email ? "input-error" : ""}
              type="email"
              placeholder="Email"
              autoFocus
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
                setFieldErrors({ ...fieldErrors, email: false });
              }}
            />
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="pass-box">
            <input
              className={fieldErrors.newpassword ? "input-error" : ""}
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newpassword}
              onChange={(e) => {
                setNewpassword(e.target.value);
                setStrength(checkStrength(e.target.value));
                setFieldErrors({ ...fieldErrors, newpassword: false });
              }}
            />

            <span
              className="eye"
              onMouseEnter={() => setShowNew(true)}
              onMouseLeave={() => setShowNew(false)}
            >
              <i className="bx bxs-lock-alt"></i>
            </span>
          </div>

          {newpassword && (
            <div className={`strength ${strength.toLowerCase()}`}>
              {strength}
            </div>
          )}

          <div className="pass-box">
            <input
              className={fieldErrors.confirmpassword ? "input-error" : ""}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => {
                setconfirmpassword(e.target.value);
                setFieldErrors({ ...fieldErrors, confirmpassword: false });

                if (newpassword && e.target.value !== newpassword) {
                  setMatchError("Password does not match");
                } else {
                  setMatchError("");
                }
              }}
            />

            <span
              className="eye"
              onMouseEnter={() => setShowConfirm(true)}
              onMouseLeave={() => setShowConfirm(false)}
            >
              <i className="bx bxs-lock-alt"></i>
            </span>
          </div>

          {matchError && <div className="match-error">{matchError}</div>}

          <div className="input-box-tx">
            <input
              className={fieldErrors.securityAnswer ? "input-error" : ""}
              type="text"
              placeholder="Security Answer"
              value={securityAnswer}
              onChange={(e) => {
                setsecurityAnswer(e.target.value);
                setFieldErrors({ ...fieldErrors, securityAnswer: false });
              }}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          {/* <button type="submit">Reset Password</button> */}
          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
