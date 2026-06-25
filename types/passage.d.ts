export interface PassageRecord {
  passageId: string;
  caseId: string;
  sourceId: string;
  locator?: string;
  text: string;
  evidenceRole: string;
  reviewStatus: string;
  publicationStatus?: string;
}
