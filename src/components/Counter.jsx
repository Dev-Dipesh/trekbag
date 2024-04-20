import { useTotalItems, useTotalPackedItems } from "../stores/itemsStore";

export default function Counter() {
  const totalItems = useTotalItems();
  const totalPackedItems = useTotalPackedItems();

  return (
    <p>
      <b>{totalPackedItems}</b> / {totalItems} items packed
    </p>
  );
}
