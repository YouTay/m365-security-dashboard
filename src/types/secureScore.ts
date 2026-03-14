export interface ControlScore {
  controlCategory: string;
  controlName?: string;
  score: number;
  maxScore: number;
  description?: string;
}

export interface ComparativeScore {
  basis: string;
  averageScore: number;
}

export interface SecureScore {
  id: string;
  currentScore: number;
  maxScore: number;
  createdDateTime: string;
  controlScores: ControlScore[];
  averageComparativeScores: ComparativeScore[];
}

export interface SecureScoreResponse {
  value: SecureScore[];
}

export interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  color: string;
}
