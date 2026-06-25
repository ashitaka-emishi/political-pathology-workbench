export interface ClaimRecord {
  claimId: string;
  caseId: string;
  claim: string;
  derivedFrom: string[];
  createdBy: "human" | "ai";
  reviewedBy?: string;
  reviewStatus: string;
  publicationStatus?: string;
  confidence?: Confidence;
}

export interface Confidence {
  value: number;
  label: "low" | "moderate" | "high";
  rationale: string;
  uncertaintyFactors?: string[];
}
