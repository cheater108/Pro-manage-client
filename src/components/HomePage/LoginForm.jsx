import styles from "./LoginForm.module.css";
import email_icon from "../../assets/email.png";
import lock_icon from "../../assets/lock.png";
import view_icon from "../../assets/view.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from "../../api/userApi";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [userData, setUserData] = useState({ email: "", password: "" });

    const input_type = showPass === false ? "password" : "text";

    function handleSubmit(e) {
        e.preventDefault();
        postLogin(userData)
            .then((data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", data.email);
                localStorage.setItem("name", data.name);
                navigate("/dashboard");
            })
            .catch((err) =>
                toast.error(err.response?.data?.error || "something went wrong")
            );
    }
    return (
        <div className={styles.outer}>
            <Toaster />
            <h1 className={styles.login}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input_container}>
                    <img src={email_icon} alt="email" />
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className={styles.input_container}>
                    <img src={lock_icon} alt="password" />
                    <input
                        className={styles.input}
                        type={input_type}
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                    <img
                        className={styles.hide}
                        src={view_icon}
                        alt="view"
                        onClick={() => setShowPass(!showPass)}
                    />
                </div>
                <button
                    type="submit"
                    className={`${styles.btn} ${styles.login_btn}`}
                >
                    Log in
                </button>
            </form>
            <p className={styles.para}>Have no account yet?</p>
            <button
                className={`${styles.btn} ${styles.register_btn}`}
                onClick={() => navigate("/user/register")}
            >
                Register
            </button>
        </div>
    );
}

export default LoginForm;
