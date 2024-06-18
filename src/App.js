// @ts-nocheck
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Router from "./router";

function App() {
  return (
    <div className="main">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}
export default App;
