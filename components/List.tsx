import { motion } from "framer-motion";
import type { IListItem } from "models/books";
import { ListItem } from "./ListItem";

interface ListProps {
  items: IListItem[];
}

const List = ({ items }: ListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6 p-6 max-w-6xl mx-auto"
    >
      {items.map((item, index) => (
        <ListItem key={index} listItem={item} />
      ))}
    </motion.div>
  );
};

export default List;
