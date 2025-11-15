export function setCookie(name: string, value: string, hours: number = 1): void {
  const now = new Date();
  now.setTime(now.getTime() + hours * 60 * 60 * 1000);
  const expires = `expires=${now.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}

export interface AuthData {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export function persistAuth(auth: AuthData): void {
  if (!auth || !auth.token || !auth.user) return;
  setCookie("auth_message", auth.message || "Login exitoso", 1);
  setCookie("auth_token", auth.token, 1);
  setCookie("user_id", auth.user.id || "", 1);
  setCookie("user_email", auth.user.email || "", 1);
  setCookie("user_firstName", auth.user.firstName || "", 1);
  setCookie("user_lastName", auth.user.lastName || "", 1);
  setCookie("user_role", auth.user.role || "", 1);
}

export function getUserFromCookies(): AuthData['user'] | null {
  const id = getCookie("user_id");
  if (!id) return null;
  return {
    id: id,
    email: getCookie("user_email") || "",
    firstName: getCookie("user_firstName") || "",
    lastName: getCookie("user_lastName") || "",
    role: getCookie("user_role") || "",
  };
}

export function isAuthenticated(): boolean {
  return !!getCookie("auth_token");
}

export function clearAuth(): void {
  deleteCookie("auth_message");
  deleteCookie("auth_token");
  deleteCookie("user_id");
  deleteCookie("user_email");
  deleteCookie("user_firstName");
  deleteCookie("user_lastName");
  deleteCookie("user_role");
}

