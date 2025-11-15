import { IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { ReactNode } from 'react';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {children}
    </>
  );
};

export default Layout;

