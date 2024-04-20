import Header from "./Header";
import ItemList from "./ItemList";
import Sidebar from "./Sidebar";

export default function Container() {
  return (
    <main>
      <Header />
      <ItemList />
      <Sidebar />
    </main>
  );
}
