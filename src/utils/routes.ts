import { 
  mockUsers, 
  mockBalance, 
  mockVotingInstances, 
  mockSurveyInstances, 
  mockInstanceResults, 
  mockSurveyResults,
  simulateNetworkDelay 
} from './mockData';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
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

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await simulateNetworkDelay();
  
  if (!payload.email || !payload.password) {
    throw new Error('Email y contraseña son requeridos');
  }
  return {
    message: 'Login exitoso',
    token: 'mock_token_' + Date.now(),
    user: {
      id: '1',
      email: payload.email,
      firstName: 'Usuario',
      lastName: 'Demo',
      role: 'admin'
    }
  };
}

export function getAuthTokenFromCookie(): string | null {
  try {
    if (typeof document === 'undefined') return null;
    const name = 'auth_token=';
    const parts = document.cookie.split(';');
    for (let i = 0; i < parts.length; i++) {
      let c = parts[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) === 0) return decodeURIComponent(c.substring(name.length));
    }
  } catch (e) {}
  return null;
}

interface ApiOptions {
  token?: string;
}

async function apiGet(url: string, tokenOverride?: string): Promise<any> {
  await simulateNetworkDelay();
  return {};
}

export async function getUsers(options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return mockUsers;
}

export async function getBalance(options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return mockBalance;
}

export async function createBalanceOrder(payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { 
    message: 'Orden creada exitosamente',
    orderId: 'mock_order_' + Date.now(),
    ...payload 
  };
}

async function apiPost(url: string, payload: any, tokenOverride?: string): Promise<any> {
  await simulateNetworkDelay();
  return { message: 'Operación exitosa', ...payload };
}

export async function createUser(payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Usuario creado exitosamente', id: 'new_' + Date.now(), ...payload };
}

export async function updateUser(id: string, payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Usuario actualizado exitosamente', id, ...payload };
}

export async function changeUserPassword(id: string, payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Contraseña actualizada exitosamente' };
}

export async function deleteUser(id: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Usuario eliminado exitosamente' };
}

export async function getVotingInstances(options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return mockVotingInstances;
}

export async function createVotingInstance(payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Instancia creada exitosamente', id: 'new_instance_' + Date.now(), ...payload };
}

export async function getVotingInstance(id: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  const instance = mockVotingInstances.find(i => i.id === id);
  if (!instance) {
    throw new Error('Instancia no encontrada');
  }
  return instance;
}

export async function generateInstanceTokens(id: string, payload: any = {}, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Tokens generados exitosamente', count: payload.count || 10 };
}

export async function sendInstanceTokens(id: string, payload: any = {}, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Correos enviados exitosamente' };
}

export async function getUserTokens(userId: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return [];
}

export async function resendTokenCode(tokenId: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Código reenviado exitosamente' };
}

export async function resendToken(tokenId: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Token reenviado exitosamente' };
}

export async function publishInstance(id: string, payload: any = {}, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Resultados publicados exitosamente' };
}

export async function getInstanceResults(id: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return mockInstanceResults;
}

async function apiPut(url: string, payload: any, tokenOverride?: string): Promise<any> {
  await simulateNetworkDelay();
  return { message: 'Actualización exitosa', ...payload };
}

async function apiDelete(url: string, tokenOverride?: string): Promise<any> {
  await simulateNetworkDelay();
  return { message: 'Eliminación exitosa' };
}

export async function updateVotingInstance(id: string, payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Instancia actualizada exitosamente', id, ...payload };
}

export async function deleteVotingInstance(id: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Instancia eliminada exitosamente' };
}

export async function getSurveyInstances(options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return mockSurveyInstances;
}

export async function getSurveyInstance(id: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  const survey = mockSurveyInstances.find(s => s.id === id);
  if (!survey) {
    throw new Error('Encuesta no encontrada');
  }
  return survey;
}

export async function createSurveyInstance(payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Encuesta creada exitosamente', id: 'new_survey_' + Date.now(), ...payload };
}

export async function generateSurveyTokens(id: string, payload: any = {}, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Tokens generados exitosamente', count: payload.count || 10 };
}

export async function sendSurveyTokens(id: string, payload: any = {}, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Correos enviados exitosamente' };
}

export async function publishSurveyInstance(id: string, payload: any = {}, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Encuesta publicada exitosamente' };
}

export async function updateSurveyInstance(id: string, payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Encuesta actualizada exitosamente', id, ...payload };
}

export async function deleteSurveyInstance(id: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Encuesta eliminada exitosamente' };
}

export async function createSurveyQuestion(surveyInstanceId: string, payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Pregunta creada exitosamente', id: 'new_question_' + Date.now(), ...payload };
}

export async function deleteSurveyQuestion(questionId: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Pregunta eliminada exitosamente' };
}

export async function getSurveyResults(id: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return mockSurveyResults;
}

export async function resendSurveyToken(tokenId: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Token reenviado exitosamente' };
}

export async function getSurveyUserTokens(userId: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return [];
}

export async function createVotingCandidate(instanceId: string, payload: any, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Candidato creado exitosamente', id: 'new_candidate_' + Date.now(), ...payload };
}

export async function deleteVotingCandidate(candidateId: string, options: ApiOptions = {}) {
  await simulateNetworkDelay();
  return { message: 'Candidato eliminado exitosamente' };
}

