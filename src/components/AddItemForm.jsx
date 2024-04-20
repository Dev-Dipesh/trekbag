import { useRef, useState } from "react";
import Button from "./Button";
import useItemsStore from "../stores/itemsStore";

export default function AddItemForm() {
  const addItem = useItemsStore((state) => state.addItem);
  const [value, setValue] = useState("");
  const [warning, setWarning] = useState(false);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      setWarning(true);
      inputRef.current.focus();
      return;
    }

    addItem(value);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setWarning(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        placeholder="Toothbrush..."
        value={value}
        autoFocus={true}
        onChange={handleChange}
      />
      {warning && <p className="warning">Please provide an item</p>}
      <Button>Add to list</Button>
    </form>
  );
}
