import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {PrivateLayout,PublicLayout} from './components'
import { UiRoutes } from './config/UIRoutes';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path={[UiRoutes.Login]} component={PublicLayout}/>
          <Route path={[UiRoutes.Root]} component={PrivateLayout}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
