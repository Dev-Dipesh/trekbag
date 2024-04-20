import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import EmptyView from "./EmptyView";
import { sortingOptions } from "../lib/constants";
import useItemsStore from "../stores/itemsStore";

export default function ItemList() {
  const items = useItemsStore((state) => state.items);
  const toggleItem = useItemsStore((state) => state.toggleItem);
  const removeItem = useItemsStore((state) => state.removeItem);

  const [sortBy, setSortBy] = useState(
    () => localStorage.getItem("sortBy") || sortingOptions[0].value
  );

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "unpacked") {
          return a.isPacked - b.isPacked;
        }
        if (sortBy === "packed") {
          return b.isPacked - a.isPacked;
        }
        return 0;
      }),
    [items, sortBy]
  );

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  if (items.length === 0) {
    return (
      <ul className="item-list">
        <EmptyView />
      </ul>
    );
  }
  return (
    <ul className="item-list">
      <section className="sorting">
        <Select
          options={sortingOptions}
          defaultValue={() =>
            sortingOptions.find((option) => option.value === sortBy)
          }
          onChange={(option) => setSortBy(option.value)}
        />
      </section>
      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          toggleItem={toggleItem}
          removeItem={removeItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, toggleItem, removeItem }) {
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.isPacked}
          onChange={() => toggleItem(item.id)}
        />
        {item.name}
      </label>
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
}
