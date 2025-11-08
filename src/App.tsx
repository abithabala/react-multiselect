import "./App.css";
import { Multiselect } from "./components/Multiselect";

const ddData = ["United Kingdom", "Germany", "France", "Italy", "Spain"];

function App() {
  const onchange = (selected: string[]) => {
    console.log("Selected items:", selected);
  };

  return (
    <>
      <div style={{ width: "200px" }}>
        <Multiselect data={ddData} onChange={onchange} />
      </div>
    </>
  );
}

export default App;
