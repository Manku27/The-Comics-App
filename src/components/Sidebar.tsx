import { sampleRunList } from "../models/mockData";
import styles from "./RunView.module.css";

const Sidebar = ({ description }: { description?: string }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>{sampleRunList.name} SERIES</h2>
        <div className={styles.runList}>
          {sampleRunList.list
            .sort((a, b) => a.id - b.id)
            .map((runItem) => (
              <div key={runItem.id} className={styles.runItem}>
                #{runItem.collects} • {runItem.name} ({runItem.year}) -{" "}
                {runItem.period}
              </div>
            ))}
        </div>
        <div className={styles.extraLinks}>
          <div className={styles.runItem}>MINISERIES</div>
          <div className={styles.runItem}>ONE-SHOTS</div>
        </div>
      </div>

      {description ? (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>DESCRIPTION</h3>
          <p className={styles.description}>{description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
