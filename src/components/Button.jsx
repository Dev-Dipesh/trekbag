export default function Button({ type, onClick = null, children }) {
  return (
    <button
      className={`btn ${type === "secondary" ? "btn--secondary" : ""}`}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </button>
  );
}
