import { EditionSelector } from "./EditionSelector";
import { sampleRunList } from "../models/mockData";
import { IRun } from "@/models/books";
import styles from "./RunView.module.css";

interface RunViewProps {
  run: IRun;
}

export const RunView = ({ run }: RunViewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {run.name}
              <span className={styles.year}>({run.year})</span>
            </h1>

            <h2 className={styles.subtitle}>AVAILABLE IN EDITIONS:</h2>
            <EditionSelector editions={run.editions} />
          </div>
        </div>

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

          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>DESCRIPTION</h3>
            <p className={styles.description}>{run.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
