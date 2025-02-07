"use client";

import { ListItem } from "./ListItem";
import { IBook } from "@/models/books";
import styles from "./List.module.css";

interface ListProps {
  items: IBook[];
}

const List = ({ items }: ListProps) => {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <ListItem key={index} listItem={item} />
      ))}
    </div>
  );
};

export default List;
