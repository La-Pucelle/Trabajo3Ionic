import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyInstance } from '../utils/routes';
import Toast from '../components/Toast';

const Survey: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getSurveyInstance(id);
        setSurvey(data);
      } catch (e: any) {
        setToast({ message: e?.message || 'Error al cargar encuesta', colorClass: 'alert-error' });
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
          <IonTitle>Encuesta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <div className="flex justify-center p-4">
            <span className="loading loading-spinner"></span>
          </div>
        ) : survey ? (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="text-2xl font-semibold">{survey.name}</h2>
              {survey.description && <p className="text-base-content/70">{survey.description}</p>}
              <div className="mt-4">
                <p><strong>Fecha inicio:</strong> {new Date(survey.startDate).toLocaleString()}</p>
                <p><strong>Fecha fin:</strong> {new Date(survey.endDate).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ) : null}
        <Toast message={toast.message} colorClass={toast.colorClass} onClose={() => setToast({ message: '', colorClass: toast.colorClass })} />
      </IonContent>
    </IonPage>
  );
};

export default Survey;

