import { Proyecto } from "./";

export interface Usuario {
  // Campos comunes
  _id?: string;
  email: string;
  password?: string;
  telephone?: string;
  isActive?: boolean;
  profileImage?: string;
  lastLogin?: Date;
  isVerified?: boolean;
  notifications?: string[];
  avatar: string;

  // Campos para usuarios empresa
  companyName?: string;
  nameCompanyRep?: string;
  surnameCompanyRep?: string;
  industryType?: string;
  companySize?: string;
  companyWebsite?: string;
  socialLinks?: string[];
  location?: string;
  companyDescription?: string;
  openRoles?: string[];

  // Campos para usuarios candidato
  jobTitle?: string;
  educationLevel?: string;
  languages?: string[];
  certifications?: string[];
  portfolioUrl?: string;
  resumeUrl?: string;
  availability?: string;

  // Campos compartidos
  projects?: Proyecto[];
  signupDate?: Date;
  isCompany?: boolean;
  curriculum?: string;
  skills?: string[];
  previousProjects?: Proyecto[];
  appliedProjects?: Proyecto[];

  peopleBlocked?: Proyecto[];
  tempImage?: File | null;
}
