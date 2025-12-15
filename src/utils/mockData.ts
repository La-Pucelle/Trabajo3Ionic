export const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'Usuario',
    role: 'admin',
    rut: '12345678-9'
  },
  {
    id: '2',
    email: 'user1@example.com',
    firstName: 'Juan',
    lastName: 'Pérez',
    role: 'user',
    rut: '98765432-1'
  },
  {
    id: '3',
    email: 'user2@example.com',
    firstName: 'María',
    lastName: 'González',
    role: 'user',
    rut: '11223344-5'
  },
  {
    id: '4',
    email: 'user3@example.com',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    role: 'user',
    rut: '55667788-9'
  }
];

export const mockBalance = {
  surveyCredits: 150,
  votingCredits: 200
};

export const mockVotingInstances = [
  {
    id: '1',
    name: 'Elección de Representante Estudiantil',
    description: 'Votación para elegir al representante estudiantil del año 2024',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    resultsPublished: false,
    candidates: [
      { id: '1', name: 'María González', description: 'Candidata por la Facultad de Ingeniería' },
      { id: '2', name: 'Juan Pérez', description: 'Candidato por la Facultad de Ciencias' },
      { id: '3', name: 'Ana Martínez', description: 'Candidata independiente' }
    ]
  },
  {
    id: '2',
    name: 'Votación de Presupuesto',
    description: 'Aprobación del presupuesto anual del centro de estudiantes',
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    resultsPublished: true,
    candidates: [
      { id: '1', name: 'Aprobar', description: 'Aprobar el presupuesto propuesto' },
      { id: '2', name: 'Rechazar', description: 'Rechazar el presupuesto propuesto' },
      { id: '3', name: 'Modificar', description: 'Solicitar modificaciones al presupuesto' }
    ]
  },
  {
    id: '3',
    name: 'Elección de Comité Directivo',
    description: 'Votación para elegir los miembros del comité directivo',
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    resultsPublished: false,
    candidates: [
      { id: '1', name: 'Lista A - Unidos', description: 'Propuesta de lista completa' },
      { id: '2', name: 'Lista B - Progreso', description: 'Propuesta alternativa' }
    ]
  }
];

export const mockSurveyInstances = [
  {
    id: '1',
    name: 'Encuesta de Satisfacción',
    description: 'Encuesta sobre la satisfacción con los servicios del centro',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    resultsPublished: false
  },
  {
    id: '2',
    name: 'Encuesta de Actividades',
    description: 'Encuesta sobre las actividades realizadas durante el semestre',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resultsPublished: true
  },
  {
    id: '3',
    name: 'Encuesta de Propuestas',
    description: 'Encuesta para recopilar propuestas para el próximo año',
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    resultsPublished: false
  }
];

export const mockInstanceResults = {
  votingInstance: {
    id: '2',
    name: 'Votación de Presupuesto',
    description: 'Aprobación del presupuesto anual del centro de estudiantes',
    resultsPublished: true,
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  stats: {
    totalTokens: 100,
    usedTokens: 75,
    totalVotes: 70,
    participationRate: 0.75
  },
  candidates: [
    { 
      id: '1', 
      name: 'Aprobar', 
      description: 'Aprobar el presupuesto propuesto',
      votes: 42,
      percentage: 60.0
    },
    { 
      id: '2', 
      name: 'Rechazar', 
      description: 'Rechazar el presupuesto propuesto',
      votes: 18,
      percentage: 25.7
    },
    { 
      id: '3', 
      name: 'Modificar', 
      description: 'Solicitar modificaciones al presupuesto',
      votes: 10,
      percentage: 14.3
    }
  ]
};

export const mockSurveyResults = {
  surveyInstance: {
    id: '2',
    name: 'Encuesta de Actividades',
    description: 'Encuesta sobre las actividades realizadas durante el semestre',
    resultsPublished: true,
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  stats: {
    totalTokens: 80,
    usedTokens: 60,
    participationRate: 0.75
  },
  questions: [
    {
      id: '1',
      text: '¿Cómo calificarías las actividades realizadas?',
      type: 'multiple_choice',
      totalResponses: 60,
      responses: [
        { option: 'Excelente', count: 20, percentage: 33.3 },
        { option: 'Buena', count: 25, percentage: 41.7 },
        { option: 'Regular', count: 10, percentage: 16.7 },
        { option: 'Mala', count: 5, percentage: 8.3 }
      ]
    },
    {
      id: '2',
      text: '¿Qué tipo de actividades te gustaría ver más?',
      type: 'multiple_choice',
      totalResponses: 58,
      responses: [
        { option: 'Deportivas', count: 18, percentage: 31.0 },
        { option: 'Culturales', count: 22, percentage: 37.9 },
        { option: 'Académicas', count: 12, percentage: 20.7 },
        { option: 'Sociales', count: 6, percentage: 10.3 }
      ]
    }
  ]
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulateNetworkDelay = async () => {
  await delay(300 + Math.random() * 500);
};

