"use client";

import { ListItem } from "./ListItem";
import { IListItem } from "@/models/books";
import styles from "./List.module.css";

interface ListProps {
  items: IListItem[];
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
