import { useState } from "react";
import styles from "./EditUser.module.css";
import account_icon from "../../assets/account.svg";
import email_icon from "../../assets/email.svg";
import lock_icon from "../../assets/lock.svg";
import view_icon from "../../assets/view.svg";
import { editUser } from "../../api/userApi";
import { getUser, logout } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { validateEditUser } from "../../utils/validators";

function EditUser() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: getUser().name,
        email: getUser().email,
        password: "",
        new_password: "",
    });
    const [showPass, setShowPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const input_type = showPass === false ? "password" : "text";
    const new_pass_type = showNewPass === false ? "password" : "text";

    function handleSubmit(e) {
        e.preventDefault();
        const { valid, error, message } = validateEditUser(userData);

        if (!valid) {
            if (error.new_password) {
                toast.error(message.new_password);
                return;
            }
        }
        setLoading(true);
        editUser(userData)
            .then((data) => {
                toast.success(
                    "Details updated successfully, Please Login again."
                );
                setTimeout(() => {
                    logout();
                    navigate("/user");
                }, 800);
            })
            .catch((err) => {
                toast.error(
                    err.response?.data?.error || "something went wrong"
                );
                setLoading(false);
            });
    }
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Toaster />
            <div className={styles.input_container}>
                <img src={account_icon} alt="name" />
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
                            email: "",
                            new_password: "",
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
                            name: "",
                            new_password: "",
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
                    type={new_pass_type}
                    name="new_password"
                    id="confirm"
                    placeholder="New Password"
                    value={userData.new_password}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            name: "",
                            email: "",
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
                <img
                    src={view_icon}
                    alt="view"
                    className={styles.hide}
                    onClick={() => setShowNewPass(!showNewPass)}
                />
            </div>
            <button className={`${styles.btn} ${styles.login_btn}`}>
                {loading ? "Updating..." : "Update"}
            </button>
        </form>
    );
}

export default EditUser;
