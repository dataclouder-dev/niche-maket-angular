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

export interface CloudStorageData {
  bucket?: string;
  url?: string;
  path?: string; // path where the file is in the storage
}

export interface IImageSource {
  image: CloudStorageData;
  description: string;
  title: string;
}

export interface IAudioSource {
  audio: CloudStorageData;
  transcription: string;
  description: string;
}

export interface IVideoSource {
  id_platform: string;
  audio: CloudStorageData;
  video: CloudStorageData;
  frames: IImageSource[];
  transcription: any;
  description: string;
}
export interface IAgentSource extends AuditDate {
  id: string;
  name: string;
  description: string;
  type: SourceType;
  sourceUrl: string;
  content: string;
  contentEnhancedAI?: string;
  image: IImageSource;
  video: IVideoSource;
  assets?: Record<string, CloudStorageData>;
  status: string;
  statusDescription: string;
  relationId?: string;
}

export const sourceTypeOptions = [
  { label: 'Document', value: SourceType.DOCUMENT },
  { label: 'Website', value: SourceType.WEBSITE },
  { label: 'Youtube', value: SourceType.YOUTUBE },
  { label: 'Notion', value: SourceType.NOTION },
];
