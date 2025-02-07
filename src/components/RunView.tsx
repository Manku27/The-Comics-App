import { EditionSelector } from "./EditionSelector";
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
              {run.year ? (
                <span className={styles.year}>({run.year})</span>
              ) : null}
            </h1>
            {run.collects.length > 0 ? (
              <span className={styles.collects}>
                <span className={styles.collectsList}>
                  {run.collects.map((collect) => (
                    <span
                      key={collect.title + collect.issues}
                      className={`${styles.collectItem} ${styles.collectItemStyled}`}
                    >
                      {collect.title} #{collect.issues}
                    </span>
                  ))}
                </span>
              </span>
            ) : null}
            <h2 className={styles.subtitle}>AVAILABLE IN EDITIONS:</h2>
            <EditionSelector editions={run.editions} />
          </div>
        </div>
      </div>
    </div>
  );
};
