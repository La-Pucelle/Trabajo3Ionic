import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVotingInstance, getInstanceResults } from '../utils/routes';
import Toast from '../components/Toast';

const Instance: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instance, setInstance] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const [instanceData, resultsData] = await Promise.all([
          getVotingInstance(id).catch(() => null),
          getInstanceResults(id).catch(() => null)
        ]);
        setInstance(instanceData);
        setResults(resultsData);
      } catch (e: any) {
        setToast({ message: e?.message || 'Error al cargar instancia', colorClass: 'alert-error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const computeStatus = (startDate: string, endDate: string) => {
    const now = Date.now();
    const s = new Date(startDate).getTime();
    const e = new Date(endDate).getTime();
    if (isNaN(s) || isNaN(e)) return { label: 'Desconocido', active: false };
    const active = now >= s && now <= e;
    const label = active ? 'En progreso' : (now < s ? 'Pendiente' : 'Finalizada');
    return { label, active };
  };

  const status = instance ? computeStatus(instance.startDate, instance.endDate) : null;
  const showResults = results && results.votingInstance?.resultsPublished;

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
          <div className="space-y-4">
            {/* Información básica */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-semibold">{instance.name}</h2>
                  {status && (
                    <span className={`badge ${status.label === 'Finalizada' ? 'badge-success' : status.label === 'En progreso' ? 'badge-primary' : 'badge-warning'}`}>
                      {status.label}
                    </span>
                  )}
                </div>
                {instance.description && <p className="text-base-content/70 mb-4">{instance.description}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-base-content/70">Fecha inicio:</span>
                    <p className="font-medium">{new Date(instance.startDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-base-content/70">Fecha fin:</span>
                    <p className="font-medium">{new Date(instance.endDate).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidatos */}
            {instance.candidates && instance.candidates.length > 0 && (
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Candidatos / Opciones</h3>
                  <div className="space-y-3">
                    {instance.candidates.map((candidate: any) => (
                      <div key={candidate.id} className="border border-base-content/15 rounded-box p-3">
                        <div className="font-medium">{candidate.name}</div>
                        {candidate.description && (
                          <div className="text-sm text-base-content/70 mt-1">{candidate.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Resultados de votación */}
            {showResults && results && (
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Resultados de la Votación</h3>
                  
                  {/* Estadísticas */}
                  {results.stats && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{results.stats.totalTokens || 0}</div>
                        <div className="text-xs text-base-content/70">Total Tokens</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{results.stats.usedTokens || 0}</div>
                        <div className="text-xs text-base-content/70">Tokens Usados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{results.stats.totalVotes || 0}</div>
                        <div className="text-xs text-base-content/70">Total Votos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-neutral">
                          {Math.round((results.stats.participationRate || 0) * 100)}%
                        </div>
                        <div className="text-xs text-base-content/70">Participación</div>
                      </div>
                    </div>
                  )}

                  {/* Resultados por candidato */}
                  {results.candidates && results.candidates.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Resultados por Opción:</h4>
                      {results.candidates
                        .sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0))
                        .map((candidate: any, index: number) => {
                          const totalVotes = results.candidates.reduce((sum: number, c: any) => sum + (c.votes || 0), 0);
                          const percentage = totalVotes > 0 ? ((candidate.votes || 0) / totalVotes) * 100 : 0;
                          const isWinner = index === 0 && candidate.votes > 0;
                          
                          return (
                            <div key={candidate.id} className="border border-base-content/15 rounded-box p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {isWinner && <span className="badge badge-success badge-sm">Ganador</span>}
                                  <span className="font-semibold">{candidate.name}</span>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold">{candidate.votes || 0} votos</div>
                                  <div className="text-sm text-base-content/70">{percentage.toFixed(1)}%</div>
                                </div>
                              </div>
                              {candidate.description && (
                                <div className="text-sm text-base-content/70 mb-2">{candidate.description}</div>
                              )}
                              <div className="w-full bg-base-300 rounded-full h-3 mt-2">
                                <div
                                  className={`h-3 rounded-full transition-all ${isWinner ? 'bg-success' : 'bg-primary'}`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mensaje si no hay resultados publicados */}
            {!showResults && status?.label === 'Finalizada' && (
              <div className="card bg-base-200 shadow-md">
                <div className="card-body text-center">
                  <p className="text-base-content/70">Los resultados aún no han sido publicados.</p>
                </div>
              </div>
            )}
          </div>
        ) : null}
        <Toast message={toast.message} colorClass={toast.colorClass} onClose={() => setToast({ message: '', colorClass: toast.colorClass })} />
      </IonContent>
    </IonPage>
  );
};

export default Instance;

