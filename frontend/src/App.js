import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeScreen from "./Screen/HomeScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from "./Screen/LoginScreen";
import SignupScreen from "./Screen/SignupScreen";
import ProfileScreen from "./Screen/ProfileScreen";
function App() {
  return (
    <>
    <Router>

    <Header/>
      <main className="my-3">
        <Container>
          <Routes>
          <Route exact path="/" element ={<HomeScreen/>}/>
          <Route exact path = "/signin" element = {<LoginScreen/>}/>
          <Route exact path = "/register" element = {<SignupScreen/>}/>
          <Route exact path = "/profile" element = {<ProfileScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer />
      </Router>
    </>
  );
}

export default App;
