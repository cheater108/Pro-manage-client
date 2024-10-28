import styles from "./LoginForm.module.css";
import email_icon from "../../assets/email.svg";
import lock_icon from "../../assets/lock.svg";
import view_icon from "../../assets/view.svg";
import account_icon from "../../assets/account.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postUser } from "../../api/userApi";
import toast from "react-hot-toast";
import { validateRegister } from "../../utils/validators";

function RegisterForm() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_pass: "",
    });
    const [loading, setLoading] = useState(false);

    const input_type = showPass === false ? "password" : "text";
    const confirm_input_type = showConfirmPass === false ? "password" : "text";

    function handleSubmit(e) {
        e.preventDefault();
        const { valid, error, message } = validateRegister(userData);

        if (!valid) {
            if (error.name) toast.error(message.name);
            if (error.email) toast.error(message.email);
            if (error.password) {
                toast.error(message.password);
                return;
            }
            if (error.confirm_pass) toast.error(message.confirm_pass);

            return;
        }

        setLoading(true);
        postUser(userData)
            .then((data) => {
                toast.success("User registered successfully");
                navigate("/user");
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
            <h1 className={styles.login}>Register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input_container}>
                    <img src={account_icon} alt="email" />
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={userData.name}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                </div>
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
                <div className={styles.input_container}>
                    <img src={lock_icon} alt="password" />
                    <input
                        className={styles.input}
                        type={confirm_input_type}
                        name="confirm_pass"
                        id="confirm"
                        placeholder="Confirm Password"
                        value={userData.confirm_pass}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                    <img
                        src={view_icon}
                        alt="view"
                        className={styles.hide}
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                    />
                </div>
                <button className={`${styles.btn} ${styles.login_btn}`}>
                    {loading ? "Registering user..." : "Register"}
                </button>
            </form>
            <p className={styles.para}>Have an account ?</p>
            <button
                className={`${styles.btn} ${styles.register_btn}`}
                onClick={() => navigate("/user")}
            >
                Log in
            </button>
        </div>
    );
}

export default RegisterForm;
