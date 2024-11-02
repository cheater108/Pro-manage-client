import modal_style from "./Modal.module.css";
import styles from "./DeleteTask.module.css";
import { deleteTask } from "../../api/taskApi";
import { useContext } from "react";
import { BoardContext } from "../common/BoardProvider";
import toast from "react-hot-toast";

function DeleteTask({ id, setDel }) {
    const { updateBoard } = useContext(BoardContext);
    function handleDelete() {
        deleteTask(id)
            .then(() => {
                updateBoard();
                setDel(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("No such task, might already be deleted.");
            });
    }
    return (
        <div className={modal_style.modal}>
            <div className={styles.container}>
                <p className={styles.para}>Are you sure you want to Delete?</p>
                <div className={styles.btns}>
                    <button className={styles.delete} onClick={handleDelete}>
                        Yes, Delete
                    </button>
                    <button
                        className={styles.cancel}
                        onClick={() => setDel(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTask;
