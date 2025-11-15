import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HomeSummary from '../components/HomeSummary';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>MiVot</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">MiVot</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="p-4">
          <section id="home-hero" className="card bg-base-100 shadow-md">
            <div className="card-body p-10 text-center">
              <div className="mb-2">
                <span className="badge badge-soft">MiVot</span>
              </div>
              <h1 className="text-3xl font-bold">Bienvenido a la Intranet MiVot</h1>
              <p className="mt-2 text-base-content/70">Administra encuestas y votaciones, gestiona usuarios y consulta resultados en un solo lugar.</p>
            </div>
          </section>
          <HomeSummary />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
