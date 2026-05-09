export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface Highlight {
  value: string;
  label: string;
  note: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface Profile {
  name: string;
  nickname: string;
  shortName: string;
  avatarUrl: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  cv: string;
}

export const profile: Profile = {
  name: 'Carlos Castillo',
  shortName: 'Carlos',
  nickname: 'CC',
  avatarUrl: '/profile.webp',
  role: 'Desarrollador Full-Stack | Ingeniero de Sistemas',
  location: 'Perú',
  email: 'carloscb8080@gmail.com',
  phone: '+51 922620827',
  website: 'https://devcastillo.com',
  linkedin: 'https://linkedin.com/in/CarlosCastilloBlas',
  github: 'https://github.com/carlosCACB333',
  summary:
    'Ingeniero de Sistemas e Informática con más de 3 años de experiencia como desarrollador full-stack. Me enfoco en soluciones limpias, escalables y orientadas a producto, con experiencia en microservicios, frontend moderno y arquitecturas mantenibles.',
  cv: '/cv.pdf',
};

export const whatsappMessage = `Hola Carlos, vi tu portafolio y me gustaría conectar.`;

export const highlights: Highlight[] = [
  {
    value: '3+',
    label: 'años de experiencia',
    note: 'Construyendo software para productos de alta demanda.',
  },
  {
    value: 'Microservicios',
    label: 'arquitectura principal',
    note: 'Backend escalable, concurrente y mantenible.',
  },
  {
    value: 'Full-Stack',
    label: 'perfil principal',
    note: 'Producto, frontend, APIs y despliegue en un solo flujo.',
  },
];

export const experiences: Experience[] = [
  {
    role: 'Desarrollador Frontend',
    company: 'Gestfy',
    period: 'Noviembre 2025 – Actualidad',
    summary: 'Construyo interfaces para una plataforma ISP enfocada en operación y métricas en tiempo real.',
    achievements: [
      'Desarrollo de interfaces con React y React Router para navegación fluida entre módulos.',
      'Dashboards con gráficas, tablas, calendarios y mapas para monitoreo operativo y comercial.',
      'Gestión de estado con Zustand y Redux, integrando APIs REST y componentes reutilizables.',
    ],
    technologies: [
      'React',
      'React Router',
      'TypeScript',
      'TanStack Query',
      'FullCalendar',
      'Bootstrap',
      'Redux',
      'Zustand',
    ],
  },
  {
    role: 'Desarrollador Full-Stack',
    company: 'TypeSubs',
    period: 'Octubre 2024 – Octubre 2025',
    summary: 'Diseñé y desarrollé interfaces y servicios para una experiencia moderna, accesible y escalable.',
    achievements: [
      'Integración de Mercado Pago y autenticación segura con Auth0.',
      'Uso de SSR, SSG e ISR para mejorar rendimiento, SEO y tiempos de carga.',
      'Arquitectura con Next.js, React.js y microservicios en Node.js y Nest.js.',
    ],
    technologies: ['Node.js', 'React.js', 'Next.js', 'Tailwind CSS', 'Redux', 'TypeScript', 'Nest.js'],
  },
  {
    role: 'Desarrollador Backend',
    company: 'Regob EIRL (Cliente BIM)',
    period: 'Enero 2023 – Diciembre 2024',
    summary:
      'Trabajé en servicios de alta concurrencia para una billetera digital con foco en rendimiento y confiabilidad.',
    achievements: [
      'Microservicios escalables y optimización de consultas y endpoints para reducir latencia.',
      'Interoperabilidad con otras billeteras digitales e integraciones seguras.',
      'Migración de deuda técnica con arquitectura hexagonal, clean architecture y pruebas automatizadas.',
    ],
    technologies: ['Python', 'FastAPI', 'Golang', 'PostgreSQL', 'MySQL', 'DynamoDB', 'AWS', 'Docker'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Lenguajes',
    items: ['Python', 'TypeScript', 'Golang', 'Java', 'Rust', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Bootstrap', 'Redux', 'Zustand'],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'Node.js', 'Nest.js', 'Django', 'Fiber', 'gRPC'],
  },
  {
    title: 'Infraestructura y DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    title: 'Arquitectura',
    items: ['gRPC', 'CQRS', 'Arquitectura Limpia', 'Microservicios', 'Arquitectura Hexagonal'],
  },
  {
    title: 'Colaboración',
    items: ['Git', 'GitHub', 'CodeCommit', 'Agile', 'Scrum'],
  },
];

export const education: EducationItem[] = [
  {
    title: 'Ingeniería de Sistemas e Informática',
    institution: 'Universidad Nacional Santiago Antúnez de Mayolo',
    period: 'Abril 2018 – Diciembre 2023',
    description: 'Estudiante del décimo superior y becado por méritos académicos.',
  },
  {
    title: 'Especializaciones y certificaciones',
    institution: 'Udemy, Platzi y Oracle Next Education',
    period: '2022 – Actualidad',
    description: 'Formación continua en desarrollo Full-Stack, Cloud y AWS.',
  },
];
