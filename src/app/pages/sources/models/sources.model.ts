export interface AuditDate {
  createdAt: string;
  updatedAt: string;
}

export enum SourceType {
  DOCUMENT = 'document',
  WEBSITE = 'website',
  API = 'api',
  NOTION = 'notion',
}

export interface ISourceLLM extends AuditDate {
  id: string;
  name: string;
  description: string;
  type: SourceType;
  sourceUrl: string;
  content: string;
  img: string;
}

export const sourceTypeOptions = [
  { label: 'Document', value: SourceType.DOCUMENT },
  { label: 'Website', value: SourceType.WEBSITE },
  { label: 'API', value: SourceType.API },
  { label: 'Notion', value: SourceType.NOTION },
];
