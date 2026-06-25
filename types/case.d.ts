export interface CaseRecord {
  caseId: string;
  title: string;
  subtype: string;
  period?: string;
  outcome: string;
  goldCase?: boolean;
  publicationStatus: string;
  reviewStatus: string;
  audience?: string;
  theoryVersions?: string[];
  summary?: string;
}
