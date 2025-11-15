import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getUsers } from '../utils/routes';
import Toast from '../components/Toast';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });

  useEffect(() => {
    (async () => {
      try {
        const data = await getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setToast({ message: e?.message || 'Error al cargar usuarios', colorClass: 'alert-error' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="text-2xl font-semibold">Lista de Usuarios</h2>
            {loading ? (
              <div className="flex justify-center p-4">
                <span className="loading loading-spinner"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Nombre</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td><span className="badge">{user.role}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <Toast message={toast.message} colorClass={toast.colorClass} onClose={() => setToast({ message: '', colorClass: toast.colorClass })} />
      </IonContent>
    </IonPage>
  );
};

export default Users;

