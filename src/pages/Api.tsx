import { IonContent, IonHeader, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import Toast from '../components/Toast';

interface PotterBook {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
}

const Api: React.FC = () => {
  const [books, setBooks] = useState<PotterBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', colorClass: 'alert-info' });

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://potterapi-fedeperin.vercel.app/es/books');
      if (!response.ok) {
        throw new Error('Error al cargar los libros');
      }
      const data = await response.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (e: any) {
      const msg = e?.message || 'No se pudieron cargar los libros de Harry Potter';
      setToast({ message: msg, colorClass: 'alert-error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleRefresh = async (e: CustomEvent) => {
    await loadBooks();
    (e.target as HTMLIonRefresherElement).complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>API - Harry Potter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="space-y-4">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="text-2xl font-semibold mb-4">Libros de Harry Potter</h2>
              <p className="text-sm text-base-content/70 mb-4">
                Información obtenida de la API pública de PotterAPI
              </p>
              {loading ? (
                <div className="flex justify-center p-4">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : books.length === 0 ? (
                <div className="text-center text-base-content/70 py-8">No hay libros disponibles</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {books.map((book) => (
                    <div key={book.index} className="card bg-base-200 shadow-sm">
                      <figure className="px-4 pt-4">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="rounded-lg w-full h-auto max-h-64 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </figure>
                      <div className="card-body p-4">
                        <h3 className="card-title text-lg">{book.title}</h3>
                        <div className="text-sm text-base-content/70 mb-2">
                          <div><strong>Título original:</strong> {book.originalTitle}</div>
                          <div><strong>Fecha de lanzamiento:</strong> {book.releaseDate}</div>
                          <div><strong>Páginas:</strong> {book.pages}</div>
                          <div><strong>Número:</strong> {book.number}</div>
                        </div>
                        {book.description && (
                          <p className="text-sm text-base-content/70 line-clamp-3 mb-3">
                            {book.description}
                          </p>
                        )}
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

export default Api;

