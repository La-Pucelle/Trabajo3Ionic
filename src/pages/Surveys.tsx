import { IonContent, IonHeader, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getSurveyInstances } from '../utils/routes';
import Toast from '../components/Toast';

function formatDateISO(iso: string) {
  try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
}

function computeStatus(startDate: string, endDate: string) {
  const now = Date.now();
  const s = new Date(startDate).getTime();
  const e = new Date(endDate).getTime();
  if (isNaN(s) || isNaN(e)) return { label: 'Desconocido', active: false, progress: 0 };
  const active = now >= s && now <= e;
  const clampedNow = Math.min(Math.max(now, s), e);
  const progress = Math.max(0, Math.min(100, ((clampedNow - s) / (e - s)) * 100));
  const label = active ? 'En progreso' : (now < s ? 'Pendiente' : 'Finalizada');
  return { label, active, progress };
}

const Surveys: React.FC = () => {
  const history = useHistory();
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('reciente');

  const loadSurveys = async () => {
    try {
      const data = await getSurveyInstances();
      setSurveys(Array.isArray(data) ? data : []);
    } catch (e: any) {
      const msg = e?.message || 'No se pudieron cargar las encuestas';
      setToast({ message: msg, colorClass: 'alert-error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      await loadSurveys();
      if (!mounted) return;
    })();
    return () => { mounted = false; };
  }, []);

  const handleRefresh = async (e: CustomEvent) => {
    setLoading(true);
    await loadSurveys();
    (e.target as HTMLIonRefresherElement).complete();
  };

  const cards = useMemo(() => surveys.map(s => ({
    ...s,
    status: computeStatus(s.startDate, s.endDate),
  })), [surveys]);

  const visible = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    let list = cards.filter(s => {
      const label = s.status.label;
      const passFilter = (
        filter === 'todas' ||
        (filter === 'finalizadas' && label === 'Finalizada') ||
        (filter === 'pendientes' && label === 'Pendiente') ||
        (filter === 'en_progreso' && label === 'En progreso') ||
        filter === 'reciente'
      );
      if (!passFilter) return false;
      const target = `${s.name || ''} ${s.description || ''}`.toLowerCase();
      const passQuery = q === '' || target.includes(q);
      return passQuery;
    });
    if (filter === 'reciente') {
      list = list.slice().sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }
    return list;
  }, [cards, filter, query]);

  const getStatusBadgeClass = (label: string) => {
    if (label === 'Finalizada') return 'badge-success';
    if (label === 'En progreso') return 'badge-primary';
    return 'badge-warning';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Encuestas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* IonRefresher - Componente nuevo de Ionic para pull-to-refresh */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="space-y-4">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="text-2xl font-semibold mb-4">Encuestas</h2>
              
              {/* Filtros */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['reciente', 'todas', 'pendientes', 'en_progreso', 'finalizadas'].map((f) => (
                  <button
                    key={f}
                    className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setFilter(f)}
                  >
                    {f === 'reciente' ? 'Más reciente' : f === 'en_progreso' ? 'En progreso' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              {/* Búsqueda */}
              <div className="form-control mb-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre o descripción..."
                  className="input input-bordered w-full"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {loading ? (
                <div className="flex justify-center p-4">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : visible.length === 0 ? (
                <div className="text-center text-base-content/70 py-8">No hay encuestas disponibles</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visible.map((survey: any) => (
                    <div key={survey.id} className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="card-title text-lg">{survey.name}</h3>
                          <span className={`badge ${getStatusBadgeClass(survey.status.label)}`}>
                            {survey.status.label}
                          </span>
                        </div>
                        {survey.description && (
                          <p className="text-sm text-base-content/70 line-clamp-2 mb-3">{survey.description}</p>
                        )}
                        <div className="text-xs text-base-content/70 mb-3">
                          <div>Inicio: {formatDateISO(survey.startDate)}</div>
                          <div>Fin: {formatDateISO(survey.endDate)}</div>
                        </div>
                        <div className="w-full bg-base-300 rounded-full h-2 mb-3">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${survey.status.progress}%` }}
                          ></div>
                        </div>
                        <div className="card-actions justify-end">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => history.push(`/survey/${survey.id}`)}
                          >
                            Ver detalle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Toast message={toast.message} colorClass={toast.colorClass} onClose={() => setToast({ message: '', colorClass: toast.colorClass })} />
      </IonContent>
    </IonPage>
  );
};

export default Surveys;

