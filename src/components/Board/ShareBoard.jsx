import modal_style from "./Modal.module.css";
import styles from "./ShareBoard.module.css";
import dropdown_icon from "../../assets/dropdown.svg";
import UserList from "../common/UserList";

function ShareBoard({ setShowShare }) {
    const [assign, setAssign] = useState(false);
    const [user, setUser] = useState({ assigned_email: "" });
    const [loading, setLoading] = useState(false);
    const [shared, setShared] = useState(false);

    function handleShare() {
        setLoading(true);
        shareBoard({ share_email: user.assigned_email })
            .then((data) => {
                setShared(true);
            })
            .catch((err) => {
                console.log(
                    err.response?.data?.error || "something went wrong"
                );
                setLoading(false);
            });
    }

    return (
        <div className={modal_style.modal}>
            <div className={styles.container}>
                {!shared ? (
                    <>
                        <p className={styles.heading}>
                            Add people to the board
                        </p>
                        <div
                            className={styles.assign_container}
                            onClick={() => {
                                setAssign((prev) => {
                                    return !prev;
                                });
                            }}
                        >
                            <div className={styles.assign_input}>
                                {user.assigned_email === ""
                                    ? "Enter the email"
                                    : user.assigned_email}
                            </div>
                            <img
                                className={styles.dropdown}
                                src={dropdown_icon}
                                alt="assign"
                            />
                            {assign && (
                                <UserList setUser={setUser} view={setAssign} />
                            )}
                        </div>
                        <div className={styles.btns}>
                            <button
                                className={styles.cancel}
                                onClick={() => setShowShare(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.add}
                                onClick={handleShare}
                            >
                                {loading ? "Sharing..." : "Add email"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className={styles.heading_success}>
                            {user.assigned_email} added to board
                        </p>
                        <div className={styles.btns}>
                            <button
                                className={styles.btn_success}
                                onClick={() => setShowShare(false)}
                            >
                                Okay, got it!
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
import { useState } from "react";
import { shareBoard } from "../../api/boardApi";

export default ShareBoard;
