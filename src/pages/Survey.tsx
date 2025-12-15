import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyInstance, getSurveyResults } from '../utils/routes';
import Toast from '../components/Toast';

const Survey: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const [surveyData, resultsData] = await Promise.all([
          getSurveyInstance(id).catch(() => null),
          getSurveyResults(id).catch(() => null)
        ]);
        setSurvey(surveyData);
        setResults(resultsData);
      } catch (e: any) {
        setToast({ message: e?.message || 'Error al cargar encuesta', colorClass: 'alert-error' });
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

  const status = survey ? computeStatus(survey.startDate, survey.endDate) : null;
  const showResults = results && results.surveyInstance?.resultsPublished;

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
          <div className="space-y-4">
            {/* Información básica */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-semibold">{survey.name}</h2>
                  {status && (
                    <span className={`badge ${status.label === 'Finalizada' ? 'badge-success' : status.label === 'En progreso' ? 'badge-primary' : 'badge-warning'}`}>
                      {status.label}
                    </span>
                  )}
                </div>
                {survey.description && <p className="text-base-content/70 mb-4">{survey.description}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-base-content/70">Fecha inicio:</span>
                    <p className="font-medium">{new Date(survey.startDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-base-content/70">Fecha fin:</span>
                    <p className="font-medium">{new Date(survey.endDate).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados de encuesta */}
            {showResults && results && (
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Resultados de la Encuesta</h3>
                  
                  {/* Estadísticas */}
                  {results.stats && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{results.stats.totalTokens || 0}</div>
                        <div className="text-xs text-base-content/70">Total Tokens</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{results.stats.usedTokens || 0}</div>
                        <div className="text-xs text-base-content/70">Tokens Usados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">
                          {Math.round((results.stats.participationRate || 0) * 100)}%
                        </div>
                        <div className="text-xs text-base-content/70">Participación</div>
                      </div>
                    </div>
                  )}

                  {/* Resultados por pregunta */}
                  {results.questions && results.questions.length > 0 && (
                    <div className="space-y-6">
                      {results.questions.map((question: any, qIndex: number) => (
                        <div key={question.id} className="border border-base-content/15 rounded-box p-4">
                          <h4 className="font-semibold mb-3">
                            {qIndex + 1}. {question.text}
                          </h4>
                          {question.totalResponses !== undefined && (
                            <div className="text-sm text-base-content/70 mb-3">
                              Total de respuestas: {question.totalResponses}
                            </div>
                          )}
                          <div className="space-y-3">
                            {question.responses && question.responses.map((response: any, rIndex: number) => {
                              const percentage = response.percentage || (question.totalResponses > 0 
                                ? (response.count / question.totalResponses) * 100 
                                : 0);
                              const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-success', 'bg-warning'];
                              const colorClass = colors[rIndex % colors.length];
                              
                              return (
                                <div key={rIndex} className="space-y-1">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{response.option}</span>
                                    <span className="text-base-content/70">
                                      {response.count} ({percentage.toFixed(1)}%)
                                    </span>
                                  </div>
                                  <div className="w-full bg-base-300 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full transition-all ${colorClass}`}
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
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

export default Survey;

