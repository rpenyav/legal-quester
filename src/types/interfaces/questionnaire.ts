interface Question {
  question: string;
  type: "multipleChoice" | "text";
  options?: string[];
}

interface Questionnaire {
  projectId: string;
  title: string;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Question, Questionnaire };
