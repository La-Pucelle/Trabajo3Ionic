import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Toast from './Toast';
import {
  getSurveyInstances,
  getSurveyResults,
  getVotingInstances,
  getInstanceResults,
} from '../utils/routes';

function formatDateISO(iso: string) {
  try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
}

function computeStatus(startDate: string, endDate: string) {
  const now = Date.now();
  const s = new Date(startDate).getTime();
  const e = new Date(endDate).getTime();
  if (isNaN(s) || isNaN(e)) return { label: 'Desconocido', active: false, progress: 0 };
  const label = now < s ? 'Pendiente' : (now <= e ? 'En progreso' : 'Finalizada');
  const active = label === 'En progreso';
  const clampedNow = Math.min(Math.max(now, s), e);
  const progress = Math.max(0, Math.min(100, ((clampedNow - s) / (e - s)) * 100));
  return { label, active, progress };
}

export default function HomeSummary() {
  const history = useHistory();
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });
  const [loading, setLoading] = useState(true);
  const [surveyItems, setSurveyItems] = useState<any[]>([]);
  const [instanceItems, setInstanceItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const [surveys, instances] = await Promise.all([
          getSurveyInstances().catch(() => []),
          getVotingInstances().catch(() => []),
        ]);

        const finalizedSurveys = (Array.isArray(surveys) ? surveys : [])
          .map((s: any) => ({ ...s, status: computeStatus(s.startDate, s.endDate) }))
          .filter((s: any) => s.status.label === 'Finalizada')
          .sort((a: any, b: any) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
          .slice(0, 5);

        const finalizedInstances = (Array.isArray(instances) ? instances : [])
          .map((i: any) => ({ ...i, status: computeStatus(i.startDate, i.endDate) }))
          .filter((i: any) => i.status.label === 'Finalizada')
          .sort((a: any, b: any) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
          .slice(0, 5);

        // Cargar resultados básicos para cada uno (silencioso si no publicados)
        const surveyWithResults = await Promise.all(finalizedSurveys.map(async (s: any) => {
          try {
            const res = await getSurveyResults(s.id);
            // Stats: totalTokens, usedTokens, participationRate
            const stats = res?.stats || {};
            let rate = Number(stats.participationRate || 0);
            if (rate > 0 && rate <= 1) rate = rate * 100;
            const totalTokens = Number(stats.totalTokens || 0);
            const usedTokens = Number(stats.usedTokens || 0);
            const usedPct = totalTokens > 0 ? Math.round((usedTokens / totalTokens) * 100) : 0;
            const ratePct = Math.round(rate);
            return { ...s, _results: { published: Boolean(res?.surveyInstance?.resultsPublished), usedTokens, totalTokens, usedPct, ratePct } };
          } catch (_) {
            return { ...s, _results: null };
          }
        }));

        const instanceWithResults = await Promise.all(finalizedInstances.map(async (i: any) => {
          try {
            const res = await getInstanceResults(i.id);
            const stats = res?.stats || {};
            const totalTokens = Number(stats.totalTokens || 0);
            const usedTokens = Number(stats.usedTokens || 0);
            const totalVotes = Number(stats.totalVotes || 0);
            let rate = Number(stats.participationRate || 0);
            if (rate > 0 && rate <= 1) rate = rate * 100;
            const usedPct = totalTokens > 0 ? Math.round((usedTokens / totalTokens) * 100) : 0;
            const votesPct = totalTokens > 0 ? Math.round((totalVotes / totalTokens) * 100) : 0;
            const ratePct = Math.round(rate);
            return { ...i, _results: { published: Boolean(res?.votingInstance?.resultsPublished), usedTokens, totalTokens, totalVotes, usedPct, votesPct, ratePct } };
          } catch (_) {
            return { ...i, _results: null };
          }
        }));

        if (!mounted) return;
        setSurveyItems(surveyWithResults);
        setInstanceItems(instanceWithResults);
      } catch (e: any) {
        if (!mounted) return;
        setToast({ message: e?.message || 'Error cargando resumen', colorClass: 'alert-error' });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const surveys = useMemo(() => surveyItems, [surveyItems]);
  const instances = useMemo(() => instanceItems, [instanceItems]);

  return (
    <section id="home-summary" className="mt-6 space-y-6">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Encuestas finalizadas</h2>
            {loading && (
              <span className="inline-flex items-center gap-2 text-sm text-base-content/70" aria-live="polite" aria-atomic="true">
                <span className="loading loading-spinner loading-xs" aria-hidden="true"></span>
                Cargando…
              </span>
            )}
          </div>
          <div id="home-summary-surveys" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surveys.length === 0 && !loading && (
              <div className="text-sm text-base-content/70">No hay encuestas finalizadas</div>
            )}
            {surveys.map((s: any) => (
              <article key={s.id} className="card rounded-box border border-base-content/15 overflow-hidden">
                <div className="card-body p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="card-title text-lg">{s.name}</h3>
                      {s.description && (<p className="text-sm text-base-content/70 line-clamp-2">{s.description}</p>)}
                    </div>
                    <span className="badge badge-success">Finalizada</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-base-content/70">Desde: {formatDateISO(s.startDate)}</div>
                    <div className="text-xs text-base-content/70">Hasta: {formatDateISO(s.endDate)}</div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {s._results ? (
                      <>
                        <div className="flex flex-col items-center gap-2">
                          <div className="radial-progress bg-primary/10 text-primary border-4 border-transparent" style={{ '--value': s._results.usedPct, '--size': '8rem', '--thickness': '0.75rem' } as React.CSSProperties} role="progressbar" aria-label="Tokens usados">{s._results.usedPct}%</div>
                          <div className="text-sm text-base-content/70">Tokens usados: {s._results.usedTokens}/{s._results.totalTokens}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="radial-progress bg-neutral/10 text-neutral border-4 border-transparent" style={{ '--value': 100, '--size': '8rem', '--thickness': '0.75rem' } as React.CSSProperties} role="progressbar" aria-label="Total de tokens">100%</div>
                          <div className="text-sm text-base-content/70">Total de tokens: {s._results.totalTokens}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="radial-progress bg-accent/10 text-accent border-4 border-transparent" style={{ '--value': s._results.ratePct, '--size': '8rem', '--thickness': '0.75rem' } as React.CSSProperties} role="progressbar" aria-label="Participación">{s._results.ratePct}%</div>
                          <div className="text-sm text-base-content/70">Participación: {s._results.ratePct}%</div>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-base-content/70 text-sm">Resultados no publicados o no disponibles.</div>
                    )}
                  </div>
                </div>
                <div className="card-footer p-4 flex items-center justify-end">
                  <button className="btn btn-soft btn-sm" onClick={() => history.push(`/survey/${s.id}`)}>Ver detalle</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Votaciones finalizadas</h2>
            {loading && (
              <span className="inline-flex items-center gap-2 text-sm text-base-content/70" aria-live="polite" aria-atomic="true">
                <span className="loading loading-spinner loading-xs" aria-hidden="true"></span>
                Cargando…
              </span>
            )}
          </div>
          <div id="home-summary-instances" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instances.length === 0 && !loading && (
              <div className="text-sm text-base-content/70">No hay votaciones finalizadas</div>
            )}
            {instances.map((i: any) => (
              <article key={i.id} className="card rounded-box border border-base-content/15 overflow-hidden">
                <div className="card-body p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="card-title text-lg">{i.name}</h3>
                      {i.description && (<p className="text-sm text-base-content/70 line-clamp-2">{i.description}</p>)}
                    </div>
                    <span className="badge badge-success">Finalizada</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-base-content/70">Desde: {formatDateISO(i.startDate)}</div>
                    <div className="text-xs text-base-content/70">Hasta: {formatDateISO(i.endDate)}</div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {i._results ? (
                      <>
                        <div className="flex flex-col items-center gap-2">
                          <div className="radial-progress bg-primary/10 text-primary border-4 border-transparent" style={{ '--value': i._results.usedPct, '--size': '8rem', '--thickness': '0.75rem' } as React.CSSProperties} role="progressbar" aria-label="Tokens usados">{i._results.usedPct}%</div>
                          <div className="text-sm text-base-content/70">Tokens usados: {i._results.usedTokens}/{i._results.totalTokens}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="radial-progress bg-secondary/10 text-secondary border-4 border-transparent" style={{ '--value': i._results.votesPct, '--size': '8rem', '--thickness': '0.75rem' } as React.CSSProperties} role="progressbar" aria-label="Total de votos">{i._results.votesPct}%</div>
                          <div className="text-sm text-base-content/70">Total de votos: {i._results.totalVotes}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="radial-progress bg-neutral/10 text-neutral border-4 border-transparent" style={{ '--value': 100, '--size': '8rem', '--thickness': '0.75rem' } as React.CSSProperties} role="progressbar" aria-label="Total de tokens">100%</div>
                          <div className="text-sm text-base-content/70">Total de tokens: {i._results.totalTokens}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="radial-progress bg-accent/10 text-accent border-4 border-transparent" style={{ '--value': i._results.ratePct, '--size': '8rem', '--thickness': '0.75rem' } as React.CSSProperties} role="progressbar" aria-label="Participación">{i._results.ratePct}%</div>
                          <div className="text-sm text-base-content/70">Participación: {i._results.ratePct}%</div>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-base-content/70 text-sm">Resultados no publicados o no disponibles.</div>
                    )}
                  </div>
                </div>
                <div className="card-footer p-4 flex items-center justify-end">
                  <button className="btn btn-soft btn-sm" onClick={() => history.push(`/instance/${i.id}`)}>Ver detalle</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Toast message={toast.message} colorClass={toast.colorClass} onClose={() => setToast({ message: '', colorClass: toast.colorClass })} />
    </section>
  );
}

