import styles from "./Board.module.css";
import people_icon from "../../assets/people.svg";
import dropdown_icon from "../../assets/dropdown.svg";
import TaskContainer from "../../components/Board/TaskContainer";
import { BoardContext } from "../../components/common/BoardProvider";
import { useContext, useState } from "react";
import { getCurrentDate, getUser } from "../../utils/helpers";
import ShareBoard from "../../components/Board/ShareBoard";

function Board() {
    const { board, filter, setFilter } = useContext(BoardContext);
    const [showShare, setShowShare] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.welcome}>Welcome! {getUser().name}</p>
                <p className={styles.today_date}>{getCurrentDate()}</p>
            </div>
            <div className={styles.second_header}>
                <div className={styles.second_header_left}>
                    <p className={styles.board_text}>Board</p>
                    <p
                        className={styles.add_people}
                        onClick={() => setShowShare(true)}
                    >
                        {" "}
                        <img src={people_icon} alt="add people" /> Add people
                    </p>
                </div>
                <div
                    className={styles.custom_select}
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <div className={styles.selected}>
                        <p>{filter}</p>
                        <img src={dropdown_icon} alt="filter" />
                    </div>
                    {showFilter && (
                        <div className={styles.options}>
                            <p
                                className={styles.option}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFilter("Today");
                                    setShowFilter(false);
                                }}
                            >
                                Today
                            </p>
                            <p
                                className={styles.option}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFilter("This Week");
                                    setShowFilter(false);
                                }}
                            >
                                This Week
                            </p>
                            <p
                                className={styles.option}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFilter("This Month");
                                    setShowFilter(false);
                                }}
                            >
                                This Month
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <main className={styles.tasks_container}>
                <TaskContainer type={"Backlog"} tasks={board.backlog} />
                <TaskContainer type={"Todo"} tasks={board.todo} />
                <TaskContainer type={"In Progress"} tasks={board.inprogress} />
                <TaskContainer type={"Done"} tasks={board.done} />
            </main>
            {showShare && <ShareBoard setShowShare={setShowShare} />}
        </div>
    );
}

export default Board;
