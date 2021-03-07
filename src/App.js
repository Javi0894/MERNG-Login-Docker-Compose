import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login"/>
        <Route path="/login" component={Login}/>
        <Route path="/home" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
