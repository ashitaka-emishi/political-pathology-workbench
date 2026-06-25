export interface ScoreRecord {
  scoreId: string;
  caseId: string;
  theoryId: string;
  variableId: string;
  interpretationId: string;
  value: number;
  confidence: {
    value: number;
    label: "low" | "moderate" | "high";
    rationale: string;
    uncertaintyFactors?: string[];
  };
  reviewStatus: string;
  publicationStatus?: string;
}
