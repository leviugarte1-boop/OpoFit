export enum TopicStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  FirstReview = 'First Review',
  SecondReview = 'Second Review',
  Mastered = 'Mastered',
}

export interface ConceptMapNode {
  title: string;
  children?: ConceptMapNode[];
}

export interface Topic {
  id: number;
  title:string;
  status: TopicStatus;
  conceptMap?: ConceptMapNode;
}

export interface PlannerTask {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface CaseStudy {
  id:string;
  title: string;
  description: string;
  topics: string[];
  solution?: { // Made optional as AI will generate it
    introduction: string;
    methodology: string;
    justification: string;
    evaluation: string;
    conclusion: string;
  };
  flashcards?: Flashcard[];
}

export interface PhysicalTest {
  id: string;
  name: string;
  description: string;
}

// --- NEW USER TYPES ---

export enum UserStatus {
  Pending = 'pending',
  Approved = 'approved',
  Revoked = 'revoked',
}

export interface UserData {
  topics: Topic[];
  tasks: PlannerTask[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string; // Storing plain text for this simulation
  reason?: string;
  status: UserStatus;
  isAdmin: boolean;
  data: UserData;
}