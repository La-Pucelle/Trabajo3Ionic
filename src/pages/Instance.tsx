import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVotingInstance } from '../utils/routes';
import Toast from '../components/Toast';

const Instance: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instance, setInstance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getVotingInstance(id);
        setInstance(data);
      } catch (e: any) {
        setToast({ message: e?.message || 'Error al cargar instancia', colorClass: 'alert-error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Instancia de Votación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <div className="flex justify-center p-4">
            <span className="loading loading-spinner"></span>
          </div>
        ) : instance ? (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="text-2xl font-semibold">{instance.name}</h2>
              {instance.description && <p className="text-base-content/70">{instance.description}</p>}
              <div className="mt-4">
                <p><strong>Fecha inicio:</strong> {new Date(instance.startDate).toLocaleString()}</p>
                <p><strong>Fecha fin:</strong> {new Date(instance.endDate).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ) : null}
        <Toast message={toast.message} colorClass={toast.colorClass} onClose={() => setToast({ message: '', colorClass: toast.colorClass })} />
      </IonContent>
    </IonPage>
  );
};

export default Instance;

