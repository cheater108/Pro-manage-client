import AdditionalInfo from "../../components/Analytics/AdditionalInfo";
import AnalyticsCard from "../../components/Analytics/AnalyticsCard";
import styles from "./AnalyticsPage.module.css";

function AnalyticsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Analytics</h1>
            <div className={styles.inner}>
                <AnalyticsCard />
                <AdditionalInfo />
            </div>
        </div>
    );
}

export default AnalyticsPage;
