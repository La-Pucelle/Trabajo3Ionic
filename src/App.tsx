import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Balance from './pages/Balance';
import Users from './pages/Users';
import Instances from './pages/Instances';
import Instance from './pages/Instance';
import Surveys from './pages/Surveys';
import Survey from './pages/Survey';
import ProtectedRoute from './components/ProtectedRoute';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu />
      <IonRouterOutlet id="main">
        <Route exact path="/login">
          <Login />
        </Route>
        <ProtectedRoute>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/balance">
            <Balance />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/instances">
            <Instances />
          </Route>
          <Route exact path="/instance/:id">
            <Instance />
          </Route>
          <Route exact path="/surveys">
            <Surveys />
          </Route>
          <Route exact path="/survey/:id">
            <Survey />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </ProtectedRoute>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
