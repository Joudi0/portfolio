export interface ProjectDetails {
  title: string;
  subtitle: string;
  architecture: string;
  codeSnippet: string;
  highlights: string[];
  securityNote: string;
  liveUrl?: string;
  repoUrl?: string;
  desktopRepoUrl?: string;
  upworkUrl?: string;
  desktopUpworkUrl?: string;
  isPrivate?: boolean;
  solutionStructure?: string;
  classArchitecture?: string[];
  designPatterns?: string[];
  dbSupport?: string[];
}

export interface HireRequestPayload {
  company: string;
  title: string;
  datetime: string;
  email: string;
  model: string;
  notes?: string;
  submittedAt: string;
}

export interface ContactFormPayload {
  fullName: string;
  email: string;
  inquiryType: string;
  message: string;
  submittedAt: string;
}

export interface ServiceRequestPayload {
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  contactInfo: string; // Email or Phone/WhatsApp
  details?: string;
  submittedAt: string;
}
