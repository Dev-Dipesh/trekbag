import useItemsStore from "../stores/itemsStore";
import Button from "./Button";

export default function ButtonGroup() {
  const removeAllItems = useItemsStore((state) => state.removeAllItems);
  const markAllAsPacked = useItemsStore((state) => state.markAllAsPacked);
  const markAllAsUnpacked = useItemsStore((state) => state.markAllAsUnpacked);
  const resetToInitial = useItemsStore((state) => state.resetToInitial);

  const controlButtons = [
    {
      text: "Mark all as complete",
      onClick: markAllAsPacked,
    },
    {
      text: "Mark all as incomplete",
      onClick: markAllAsUnpacked,
    },
    {
      text: "Reset to initial",
      onClick: resetToInitial,
    },
    {
      text: "Remove all items",
      onClick: removeAllItems,
    },
  ];

  return (
    <section className="button-group">
      {controlButtons.map((button) => (
        <Button key={button.text} type="secondary" onClick={button.onClick}>
          {button.text}
        </Button>
      ))}
    </section>
  );
}
