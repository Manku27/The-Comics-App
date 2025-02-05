import Link from "next/link";
import Image from "next/image";
import { comicRuns } from "../models/mockData";
import styles from "./HomeScreen.module.css";

const HomeScreen = () => {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/bat.png"
          alt="Batman Symbol"
          width={150}
          height={150}
          className={styles.batSymbol}
        />
        <h1 className={styles.title}>GOTHAM NEEDS YOU</h1>
      </div>

      <div className={styles.comicGrid}>
        {comicRuns.map((run, index) => (
          <Link
            key={run.runId}
            href={`/runs/${run.runId}`}
            className={styles.comicCard}
          >
            <span className={styles.ranking}>#{index + 1}</span>
            <h2>{run.title.toUpperCase()}</h2>
            <div className={styles.comicInfo}>
              <p>BY: {run.creators}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default HomeScreen;
