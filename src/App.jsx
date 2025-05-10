import PageNotFound from "components/commons/PageNotFound";
import Home from "components/Home";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

const App = () => (
  <Switch>
    <Route exact component={Home} path={routes.root} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
