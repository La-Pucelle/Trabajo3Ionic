import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getBalance } from '../utils/routes';
import Toast from '../components/Toast';

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });

  useEffect(() => {
    (async () => {
      try {
        const data = await getBalance();
        setBalance(data);
      } catch (e: any) {
        setToast({ message: e?.message || 'Error al cargar balance', colorClass: 'alert-error' });
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
          <IonTitle>Balance</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1"><span className="badge badge-soft">Balance</span></div>
                <h2 className="text-2xl font-semibold">Créditos disponibles</h2>
                <p className="text-sm text-base-content/70">Consulta tu balance actual y recarga cuando lo necesites.</p>
              </div>
              <a href="/balance/recargar" className="btn btn-primary">Recargar saldo</a>
            </div>
            {loading ? (
              <div className="flex justify-center p-4">
                <span className="loading loading-spinner"></span>
              </div>
            ) : balance ? (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-box border border-base-content/15 px-3 py-2 flex items-center justify-between">
                  <span className="text-sm">Encuesta</span>
                  <span className="badge badge-sm">{balance.surveyCredits ?? 0}</span>
                </div>
                <div className="rounded-box border border-base-content/15 px-3 py-2 flex items-center justify-between">
                  <span className="text-sm">Votación</span>
                  <span className="badge badge-sm">{balance.votingCredits ?? 0}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Toast message={toast.message} colorClass={toast.colorClass} onClose={() => setToast({ message: '', colorClass: toast.colorClass })} />
      </IonContent>
    </IonPage>
  );
};

export default Balance;

