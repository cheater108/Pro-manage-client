import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";
import styles from "./UserList.module.css";
import { getNameTag } from "../../utils/helpers";

function UserList({ setUser, view }) {
    const [users, setUsers] = useState([]);

    function handleAssign(email) {
        setUser((prev) => {
            return { ...prev, assigned_email: email };
        });
        view(false);
    }

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data.users))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className={styles.emails_container}>
            {users.map((user) => (
                <div className={styles.email}>
                    <div className={styles.email_inner}>
                        <div className={styles.initials}>
                            {getNameTag(user.email)}
                        </div>
                        <p className={styles.email_text}>{user.email}</p>
                    </div>
                    <button
                        className={styles.assign_btn}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAssign(user.email);
                        }}
                    >
                        Assign
                    </button>
                </div>
            ))}
        </div>
    );
}

export default UserList;
