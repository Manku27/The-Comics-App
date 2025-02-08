import { IBook } from "@/models/books";
import { BookControls } from "./BookControls";
import Image from "next/image";
import styles from "./ListItem.module.css";

interface Props {
  listItem: IBook;
}

export const ListItem = ({ listItem }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.bookNumber}>BOOK #{listItem.id}</div>
        <div className={styles.imageWrapper}>
          <Image
            src={`/covers/${listItem.id}.webp`}
            alt={listItem.title}
            fill
            className={styles.image}
            sizes="160px"
          />
        </div>
        <BookControls />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{listItem.title}</h2>

        <div className={styles.creators}>
          <span>
            BY: {listItem.authors.map((author) => author.name).join(", ")}
          </span>
          <span>
            ART:{" "}
            {listItem.illustrators
              .map((illustrator) => illustrator.name)
              .join(", ")}
          </span>
        </div>

        <div className={styles.rating}>
          {"★".repeat(Math.floor(listItem.rating))}
          {"☆".repeat(5 - Math.floor(listItem.rating))}
          <span>{listItem.rating.toFixed(1)}</span>
          <span>•</span>
          <span>{listItem.noOfRatings.toLocaleString()} RATINGS</span>
        </div>

        {listItem.collects && listItem.collects.length > 0 && (
          <div className={styles.collects}>
            <p>COLLECTS:</p>
            <ul>
              {listItem.collects.map((item, index) => (
                <li key={index}>
                  {item.title} #{item.issues}
                </li>
              ))}
            </ul>
          </div>
        )}

        {listItem.description && listItem.description.length > 0 && (
          <p className={styles.description}>{listItem.description}</p>
        )}

        <div className={styles.details}>
          <div>
            <span>PUBLISHED:</span> {listItem.published}
          </div>
          <div>
            <span>REPUBLISHED:</span> {listItem.latestRepublished}
          </div>
          <div>
            <span>PAGES:</span> {listItem.pageCount}
          </div>
          <div>
            <span>ISBN:</span> {listItem.isbn}
          </div>

          {listItem.medianPrice && listItem.medianPrice > 0 ? (
            <div>
              <span>PRICE:</span> ₹{listItem.medianPrice.toFixed(2)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
