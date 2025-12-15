import { IonContent, IonHeader, IonMenuButton, IonModal, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getUsers } from '../utils/routes';
import Toast from '../components/Toast';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setToast({ message: e?.message || 'Error al cargar usuarios', colorClass: 'alert-error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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
                      <tr key={user.id} className="cursor-pointer hover:bg-base-200" onClick={() => handleUserClick(user)}>
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

      {/* IonModal - Componente nuevo de Ionic */}
      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Detalles del Usuario</IonTitle>
            <IonButton slot="end" fill="clear" onClick={closeModal}>Cerrar</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {selectedUser && (
            <div className="card bg-base-100 shadow-md">
              <div className="card-body space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Información Personal</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-base-content/70">Email:</span>
                      <p className="text-base">{selectedUser.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-base-content/70">Nombre completo:</span>
                      <p className="text-base">{selectedUser.firstName} {selectedUser.lastName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-base-content/70">Rol:</span>
                      <p className="text-base"><span className="badge">{selectedUser.role}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Users;

