import Navbar from "./components/Navbar";
import "./App.css";
import ApiContextProvider from "./context/ApiContext";
import Posts from "./components/Posts";
import PublishPost from "./components/PublishPost";

function App() {
  return (
    <ApiContextProvider>
      <Navbar />
      <div className="wrapper">
        <PublishPost />
        <Posts />
      </div>
    </ApiContextProvider>
  );
}

export default App;
