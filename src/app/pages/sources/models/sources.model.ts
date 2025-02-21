export interface AuditDate {
  createdAt: string;
  updatedAt: string;
}

export enum SourceType {
  DOCUMENT = 'document',
  WEBSITE = 'website',
  YOUTUBE = 'youtube',
  NOTION = 'notion',
}

export interface ISourceLLM extends AuditDate {
  id: string;
  name: string;
  description: string;
  type: SourceType;
  sourceUrl: string;
  content: string;
  contentEnhancedAI?: string;
  img: string;
}

export const sourceTypeOptions = [
  { label: 'Document', value: SourceType.DOCUMENT },
  { label: 'Website', value: SourceType.WEBSITE },
  { label: 'Youtube', value: SourceType.YOUTUBE },
  { label: 'Notion', value: SourceType.NOTION },
];
