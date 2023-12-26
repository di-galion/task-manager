import Header from "./components/header/Header.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
// import {Table} from "@mui/material";
import Table from "./components/table/Table.tsx";

function App() {
  return (
    <div className="App">
        <Header/>
        <div style={{display: "flex"}}>
            <aside style={{width: "234px"}}>
                <Navbar />
            </aside>
            <main style={{flexGrow: "1"}}>
                <Table />
            </main>
        </div>
    </div>
  );
}

export default App;
