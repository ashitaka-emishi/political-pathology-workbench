export interface CaseSource {
  sourceId: string;
  role: string;
  access: string;
  notes?: string;
}

export interface SourcePack {
  caseId: string;
  sources: CaseSource[];
}
