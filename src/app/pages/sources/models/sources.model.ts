export interface AuditDate {
  createdAt: string;
  updatedAt: string;
}

export interface ISourceLLM extends AuditDate {
  id: string;
  img: string;
  name: string;
  type: string;
  content: string;
}
