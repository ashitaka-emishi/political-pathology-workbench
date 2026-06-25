export interface InterpretationRecord {
  interpretationId: string;
  caseId: string;
  claimIds: string[];
  theoryId: string;
  variableId: string;
  interpretation: string;
  reviewStatus: string;
  publicationStatus?: string;
  confidence?: {
    value: number;
    label: "low" | "moderate" | "high";
    rationale: string;
    uncertaintyFactors?: string[];
  };
}
