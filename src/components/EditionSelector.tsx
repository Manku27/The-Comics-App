"use client";

import { useState } from "react";
import List from "./List";
import { IEdition, IBook } from "@/models/books";
import styles from "./EditionSelector.module.css";

interface EditionSelectorProps {
  editions: IEdition[];
}

export const EditionSelector = ({ editions }: EditionSelectorProps) => {
  const [selectedEditionIndex, setSelectedEditionIndex] = useState(0);
  return (
    <>
      <div className={styles.buttonContainer}>
        {editions.map((edition, index) => (
          <button
            key={index}
            onClick={() => setSelectedEditionIndex(index)}
            className={`${styles.button} ${
              selectedEditionIndex === index ? styles.selected : ""
            }`}
          >
            {edition.type.toUpperCase()}
            <br />
            <div style={{ fontSize: "0.8em" }}>({edition.covertype})</div>
          </button>
        ))}
      </div>

      <div className={styles.listContainer}>
        <div key={selectedEditionIndex} className={styles.editionContent}>
          <List items={editions[selectedEditionIndex].list as any[]} />
        </div>
      </div>
    </>
  );
};
