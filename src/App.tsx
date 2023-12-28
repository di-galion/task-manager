import "./App.styles.scss"
import {Header} from "./components/header";
import {Navbar} from "./components/navbar";
import {TableProject} from "./components/table-project"

function App() {
  return (
    <div className="App">
        <Header/>
        <div className={"content-container"}>
            <aside>
                <Navbar />
            </aside>
            <main>
                <TableProject />
            </main>
        </div>
    </div>
  );
}

export default App;
