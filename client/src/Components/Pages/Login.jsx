import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Login.css";

function Login({ onLoginSuccess }) {
  const [popup, setPopup] = useState("");
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  }

  function showPopup(message) {
    setPopup(message);

    setTimeout(() => {
      setPopup("");
    }, 2500);
  }

  function markError(inputs) {
    inputs.forEach((input) => {
      input.classList.add("input-error", "shake");

      setTimeout(() => {
        input.classList.remove("shake");
      }, 300);
    });
  }
  useEffect(() => {
    const container = document.getElementById("container");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = loginForm
          .querySelector('input[name="email"]')
          .value.trim();
        const password = loginForm
          .querySelector('input[name="password"]')
          .value.trim();

        if (!email || !password) {
          showPopup("📝Please fill all fields‼");
          markError(Array.from(loginForm.querySelectorAll("input")));
          return;
        }

        try {
          const res = await axios.post(
            "http://localhost:5000/api/users/login",
            {
              email: email,
              password: password,
            },
          );

          // console.log("LOGIN RESPONSE 👉", res.data);

          if (res.data && res.data.token && res.data.user) {
            const userData = {
              ...res.data.user,
              token: res.data.token,
            };
            // localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            // localStorage.setItem("userInfo", JSON.stringify(userData));// ankit code
            localStorage.setItem("user", JSON.stringify(userData));
            showPopup("🎉 Login successful!");
            onLoginSuccess(userData);
          } else {
            throw new Error("Login Failed");
          }

          // if (res.data && res.data.user && res.data.user.token) {
          //   const userData = {
          //     ...res.data.user,
          //     token: res.data.user.token,
          //   };

          //   localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          // } else {
          //   throw new Error("Login Failed:");
          // }

          // setTimeout(() => {
          // window.location.href = "/";
          // }, 1500);
        } catch (err) {
          showPopup("🚫 Invalid user!");
          markError(Array.from(loginForm.querySelectorAll("input")));
        }

        loginForm.reset();
      });
    }

    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = registerForm
          .querySelector('input[name="username"]')
          .value.trim();
        const email = registerForm
          .querySelector('input[name="email"]')
          .value.trim();
        const password = registerForm
          .querySelector('input[name="password"]')
          .value.trim();
        const securityAnswer = registerForm
          .querySelector('input[name="securityAnswer"]')
          .value.trim();

        if (!username || !email || !password || !securityAnswer) {
          showPopup("📝Please fill all fields‼");
          markError(Array.from(registerForm.querySelectorAll("input")));
          return;
        }

        try {
          await axios.post("http://localhost:5000/api/users/register", {
            name: username,
            email: email,
            password: password,
            securityAnswer: securityAnswer,
          });

          showPopup("🎊 Registration successful!");

          registerForm.reset();

          setTimeout(() => {
            container.classList.remove("active");
            container.classList.remove("switching");
          }, 800);
        } catch (err) {
          showPopup("🚫 Email already exists!");
        }

        const usernameRegex = /^[a-zA-Z0-9]{6}$/;

        if (!usernameRegex.test(username)) {
          showPopup("👤 Username must be 6 letters or numbers!");
          return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
          showPopup("📧 Please enter a valid email address!");
          return;
        }

        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9]).{8}$/;

        if (!passwordRegex.test(password)) {
          showPopup(
            "🔐 Password must be 8 characters (1 upercase, 1 lowercase letters, 1 symbols or 1 numbers)",
          );
          return;
        }

        container.classList.add("switching");

        const userData = {
          username,
          password: "You are login",
          _hash: simpleHash(password),
        };

        showPopup("🎊Registration successful!");

        registerForm.reset();

        setTimeout(() => {
          container.classList.remove("active");
          container.classList.remove("switching");
        }, 800);
      });
    }
  }, []);
  const openRegister = document.getElementById("openRegister");
  const openLogin = document.getElementById("openLogin");

  if (openRegister && openLogin && container) {
    openRegister.onclick = (e) => {
      e.preventDefault();
      container.classList.add("active");
    };

    openLogin.onclick = (e) => {
      e.preventDefault();
      container.classList.remove("active");
    };

    document.querySelectorAll(`input[type ="password"]`).forEach((input) => {
      input.addEventListener("mouseenter", () => {
        input.type = "text";
      });

      input.addEventListener("mouseleave", () => {
        input.type = "password";
      });
    });
  }

  return (
    <>
      {popup && <div className="popup-message show">{popup}</div>}

      <div class="scene">
        <div class="orb one"></div>
        <div class="orb two"></div>
        <div class="orb three"></div>
      </div>
      <div
        className={`container-signup ${isRegisterActive ? "active" : ""}`}
        id="container"
      >
        <div class="form-box login">
          <form class="login-box" id="loginForm">
            <h1 className="heading-txt">Login</h1>

            <div class="input-box">
              <input type="email" name="email" placeholder="Email" />
              <i className="bx bxs-envelope"></i>
            </div>

            <div class="input-box">
              <input type="password" name="password" placeholder="Password" />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" class="btn">
              Login
            </button>
          </form>
          <div class="forget-password">
            <Link to="/forget-password" className="forget-txt">
              Forget Password
            </Link>
          </div>

          <div class="new-account">
            <h6>
              You Don't have an account ?
              <Link
                href="#"
                id="openRegister"
                onClick={(e) => {
                  e.preventDefault();
                  setIsRegisterActive(true);
                }}
              >
                New Register
              </Link>
            </h6>
          </div>
        </div>

        <div class="form-box register">
          <form class="register-box" id="registerForm">
            <h1>Register</h1>
            <div class="input-box">
              <input type="text" name="username" placeholder="Username" />
              <i className="bx bxs-user"></i>
            </div>

            <div class="input-box">
              <input type="email" name="email" placeholder="Email" />
              <i className="bx bxs-envelope"></i>
            </div>

            <div class="input-box">
              <input type="password" name="password" placeholder="Password" />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div class="input-box">
              <input
                type="text"
                name="securityAnswer"
                placeholder="Security Answer"
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" class="btn">
              Register
            </button>
          </form>
          <div class="new-account">
            <h6>
              You have an already account ?
              <Link
                href="#"
                id="openLogin"
                onClick={(e) => {
                  e.preventDefault();
                  setIsRegisterActive(false);
                }}
              >
                Login
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
