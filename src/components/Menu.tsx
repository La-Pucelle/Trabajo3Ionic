import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { home, people, wallet, logOut, clipboard, document, book } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getBalance } from '../utils/routes';
import { clearAuth, getUserFromCookies } from '../utils/cookies';

const Menu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [balance, setBalance] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBalance();
        setBalance(data);
      } catch (e) {
        console.error('Error loading balance', e);
      }
    })();

    const userData = getUserFromCookies();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    clearAuth();
    history.push('/login');
  };

  const menuItems = [
    { title: 'Inicio', url: '/home', icon: home },
    { title: 'Instancias', url: '/instances', icon: clipboard },
    { title: 'Encuestas', url: '/surveys', icon: document },
    { title: 'Usuarios', url: '/users', icon: people },
    { title: 'Balance', url: '/balance', icon: wallet },
    { title: 'API', url: '/api', icon: book },
  ];

  const getInitials = () => {
    if (user) {
      const first = (user.firstName || '').trim();
      const last = (user.lastName || '').trim();
      const fi = first ? first[0] : '';
      const li = last ? last[0] : '';
      if (fi || li) return (fi + li).toUpperCase();
      const email = (user.email || '').trim();
      if (email) return email[0].toUpperCase();
    }
    return 'US';
  };

  const getUserName = () => {
    if (user) {
      const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
      return name || 'Usuario';
    }
    return 'Usuario';
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <div className="p-4 bg-base-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-12">
                <span className="text-lg">{getInitials()}</span>
              </div>
            </div>
            <div>
              <div className="font-semibold">{getUserName()}</div>
              <div className="text-sm text-base-content/70">{user?.email || ''}</div>
            </div>
          </div>

          <IonList className="bg-base-100">
            {menuItems.map((item) => (
              <IonMenuToggle key={item.title} autoHide={false}>
                <IonItem
                  routerLink={item.url}
                  routerDirection="none"
                  lines="none"
                  className={location.pathname === item.url ? 'text-primary font-semibold' : ''}
                >
                  <IonIcon icon={item.icon} slot="start" />
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>

          <div className="card bg-base-200 shadow-sm mt-4">
            <div className="card-body p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="badge badge-soft">Balance</span>
                <a href="#/balance" className="btn btn-ghost btn-xs">Ver</a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-box border border-base-content/15 px-2 py-1 flex items-center justify-between">
                  <span className="text-xs">Encuesta</span>
                  <span className="badge badge-sm">{balance?.surveyCredits ?? 0}</span>
                </div>
                <div className="rounded-box border border-base-content/15 px-2 py-1 flex items-center justify-between">
                  <span className="text-xs">Votación</span>
                  <span className="badge badge-sm">{balance?.votingCredits ?? 0}</span>
                </div>
              </div>
            </div>
          </div>

          <IonList className="bg-base-100 mt-4">
            <IonItem button onClick={handleLogout} lines="none" className="text-error">
              <IonIcon icon={logOut} slot="start" />
              <IonLabel>Salir</IonLabel>
            </IonItem>
          </IonList>

          <div className="text-center text-xs text-base-content/60 pt-4">MiVot V.0.1</div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

