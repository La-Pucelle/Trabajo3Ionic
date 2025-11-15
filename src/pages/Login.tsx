import { useState } from "react";
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Toast from '../components/Toast';
import { login } from '../utils/routes';
import { persistAuth } from '../utils/cookies';
import { LoginIcon } from '../utils/icons';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", colorClass: "alert-info" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValid = Boolean(email) && /.+@.+\..+/.test(email);
    const passwordValid = Boolean(password) && password.length >= 6;
    setTouched({ email: true, password: true });
    if (!emailValid || !passwordValid) {
      const msg = !emailValid ? "Email inválido" : "La contraseña debe tener al menos 6 caracteres";
      setToast({ message: msg, colorClass: "alert-error" });
      return;
    }
    setLoading(true);
    try {
      const data = await login({ email, password });
      persistAuth(data);
      setToast({ message: data.message || "Login exitoso", colorClass: "alert-success" });
      setTimeout(() => {
        history.push('/home');
      }, 500);
    } catch (err: any) {
      setToast({ message: err.message || "Error al iniciar sesión", colorClass: "alert-error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex items-center justify-center min-h-screen">
          <div className="card bg-base-100 shadow-xl w-full max-w-md">
            <div className="card-header p-6">
              <h2 className="text-2xl font-semibold m-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Iniciar sesión</h2>
              <p className="text-xl text-base-content/80 mt-0">Accede a tu cuenta para continuar</p>
            </div>
            <form className="card-body p-6 grid gap-4" onSubmit={onSubmit}>
              <label className="form-control w-full">
                <span className="label">
                  <span className="label-text">Email</span>
                </span>
                <input
                  type="email"
                  className={`input input-bordered w-full ${touched.email ? (/.+@.+\..+/.test(email) ? 'is-valid' : 'is-invalid') : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, email: true }))}
                  placeholder="tu@correo.com"
                  required
                />
              </label>
              <label className="form-control w-full">
                <span className="label">
                  <span className="label-text">Contraseña</span>
                </span>
                <input
                  type="password"
                  className={`input input-bordered w-full ${touched.password ? (password.length >= 6 ? 'is-valid' : 'is-invalid') : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, password: true }))}
                  placeholder="••••••••"
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="inline-flex items-center gap-2"><span className="loading loading-spinner"></span>Procesando...</span>
                ) : (
                  <span className="inline-flex items-center gap-2">Log In <LoginIcon className="size-6" /></span>
                )}
              </button>
            </form>
            <Toast message={toast.message} colorClass={toast.colorClass} onClose={() => setToast({ message: "", colorClass: toast.colorClass })} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

