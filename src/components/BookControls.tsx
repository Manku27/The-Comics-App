"use client";

import { COLLECTION_STATUS, READ_STATUS } from "@/constants/books";
import { useState } from "react";
import styles from "./BookControls.module.css";

interface BookControlsProps {
  initialReadStatus?: string;
  initialCollectionStatus?: string;
  initialRating?: number;
  initialPrice?: string;
}

export const BookControls = ({
  initialReadStatus = "",
  initialCollectionStatus = "",
  initialRating = 0,
  initialPrice = "",
}: BookControlsProps) => {
  const [readStatus, setReadStatus] = useState(initialReadStatus);
  const [collectionStatus, setCollectionStatus] = useState(
    initialCollectionStatus
  );
  const [userRating, setUserRating] = useState(initialRating);
  const [price, setPrice] = useState(initialPrice);

  const clearIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.clearIcon}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.controlGroup}>
        <select
          className={styles.select}
          value={readStatus}
          onChange={(e) => setReadStatus(e.target.value)}
        >
          <option value="">READ STATUS</option>
          {READ_STATUS.map((status) => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>
        {readStatus && (
          <button
            onClick={() => setReadStatus("")}
            className={styles.clearButton}
          >
            {clearIcon}
          </button>
        )}
      </div>

      {readStatus === "Read" && (
        <div className={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setUserRating(star)}
              className={`${styles.starButton} ${
                userRating >= star ? styles.active : ""
              }`}
            >
              ★
            </button>
          ))}
        </div>
      )}

      <div className={styles.controlGroup}>
        <select
          className={styles.select}
          value={collectionStatus}
          onChange={(e) => setCollectionStatus(e.target.value)}
        >
          <option value="">COLLECTION</option>
          {COLLECTION_STATUS.map((status) => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>
        {collectionStatus && (
          <button
            onClick={() => {
              setCollectionStatus("");
              setPrice("");
            }}
            className={styles.clearButton}
          >
            {clearIcon}
          </button>
        )}
      </div>

      {collectionStatus === "Have" && (
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="ENTER PRICE"
          className={styles.input}
        />
      )}
    </div>
  );
};
