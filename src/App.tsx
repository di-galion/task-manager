import {Header} from "./components/header";
import {Navbar} from "./components/navbar";
import {TableProject} from "./components/table-project"

function App() {
  return (
    <div className="App">
        <Header/>
        <div style={{display: "flex"}}>
            <aside style={{width: "234px"}}>
                <Navbar />
            </aside>
            <main style={{flexGrow: "1"}}>
                <TableProject />
            </main>
        </div>
    </div>
  );
}

export default App;
