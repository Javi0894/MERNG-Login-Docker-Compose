import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login"/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
