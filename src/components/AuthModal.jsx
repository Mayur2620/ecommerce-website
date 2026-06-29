import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "bootstrap";
import toast from "react-hot-toast";

const AuthModal = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const cleanupModalState = () => {
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((backdrop) => backdrop.remove());
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
  };

  const closeModal = (onClosed) => {
    const authModal = document.getElementById("authModal");

    if (!authModal) {
      cleanupModalState();
      onClosed?.();
      return;
    }

    const modalInstance = Modal.getOrCreateInstance(authModal);

    authModal.addEventListener(
      "hidden.bs.modal",
      () => {
        cleanupModalState();
        onClosed?.();
      },
      { once: true }
    );

    modalInstance.hide();
  };

  const getStoredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      return [];
    }
  };

  const handleRegister = () => {
    const users = getStoredUsers();
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail || !password || !confirmPassword) {
      toast.error("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userExists = users.some(
      (user) => user.email?.toLowerCase() === normalizedEmail
    );

    if (userExists) {
      toast.error("User already exists");
      return;
    }

    const newUser = {
      name: trimmedName,
      email: normalizedEmail,
      password,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    toast.success("Account created successfully");
    resetForm();
    setIsLogin(true);
  };

  const handleLogin = () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      toast.error("Enter email and password");
      return;
    }

    const foundUser = getStoredUsers().find(
      (user) =>
        user.email?.toLowerCase() === normalizedEmail &&
        user.password === password
    );

    if (!foundUser) {
      toast.error("Invalid credentials");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    toast.success("Login successful");
    closeModal(() => {
      onAuthSuccess?.(foundUser);
      resetForm();
    });
  };

  const toggleMode = () => {
    resetForm();
    setIsLogin((currentMode) => !currentMode);
  };

  const authDialog = (
      <div className="modal fade" id="authModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="row g-0">
              <div
                className="col-md-5 p-4 text-white"
                style={{ background: "#2874f0" }}
              >
                <h3>{isLogin ? "Login" : "Register"}</h3>
                <p>Get access to Orders, Wishlist & Recommendations</p>
              </div>

              <div className="col-md-7 p-4">
                {!isLogin && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Full Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                )}

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                {!isLogin && (
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                )}

                <button
                  type="button"
                  className="btn btn-warning w-100 fw-bold"
                  onClick={isLogin ? handleLogin : handleRegister}
                >
                  {isLogin ? "Login" : "Register"}
                </button>

                <div className="text-center mt-3">
                  <button type="button" className="btn btn-link" onClick={toggleMode}>
                    {isLogin
                      ? "New user? Create account"
                      : "Already have account? Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  return (
    <>
      <button
        className="login-trigger"
        data-bs-toggle="modal"
        data-bs-target="#authModal"
        type="button"
      >
        Login
      </button>

      {createPortal(authDialog, document.body)}
    </>
  );
};

export default AuthModal;
