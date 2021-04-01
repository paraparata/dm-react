import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import About from "./pages/About";
import Drumpads from "./pages/Drumpads";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Drumpads} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
