import styles from "./LoginForm.module.css";
import email_icon from "../../assets/email.svg";
import lock_icon from "../../assets/lock.svg";
import view_icon from "../../assets/view.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from "../../api/userApi";
import toast from "react-hot-toast";
import { validateLogin } from "../../utils/validators";

function LoginForm() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const input_type = showPass === false ? "password" : "text";

    function handleSubmit(e) {
        e.preventDefault();

        const { valid, error, message } = validateLogin(userData);
        if (!valid) {
            if (error.email) toast.error(message.email);
            if (error.password) toast.error(message.password);
            return;
        }

        setLoading(true);
        postLogin(userData)
            .then((data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", data.email);
                localStorage.setItem("name", data.name);
                navigate("/dashboard");
            })
            .catch((err) => {
                toast.error(
                    err.response?.data?.error || "something went wrong"
                );
                setLoading(false);
            });
    }
    return (
        <div className={styles.outer}>
            <h1 className={styles.login}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input_container}>
                    <img
                        src={email_icon}
                        className={styles.email_icon}
                        alt="email"
                    />
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
                    {loading ? "Logging in..." : "Log in"}
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
