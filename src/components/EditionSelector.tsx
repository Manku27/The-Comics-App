"use client";

import { useState } from "react";
import List from "./List";
import { IEdition } from "@/models/books";
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
          </button>
        ))}
      </div>

      <div className={styles.listContainer}>
        <div key={selectedEditionIndex} className={styles.editionContent}>
          <List items={editions[selectedEditionIndex].list} />
        </div>
      </div>
    </>
  );
};
