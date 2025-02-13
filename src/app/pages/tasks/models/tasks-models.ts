import { IAgentCard } from '@dataclouder/conversation-system';

export interface ISourceTask {
  id: string;
  name: string;
  type: string;
}

export type IAgentCardMinimal = Pick<IAgentCard, 'id' | 'assets'>;

export interface IAgentTask {
  _id?: string;
  id: string;
  agentCard: Partial<IAgentCard>;
  agentCards: Partial<IAgentCard>[];
  name: string;
  description: string;
  status: string;
  idNotionDB: string;
  taskType: AgentTaskType;
  sources: ISourceTask[];
}

export enum AgentTaskStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
}
export const AgentTaskStatusOptions = [
  { label: 'Activo', value: AgentTaskStatus.ACTIVE },
  { label: 'En pausa', value: AgentTaskStatus.PAUSED },
];

export enum AgentTaskType {
  POST_NOTION = 'post_notion',
}

export const AgentTaskOptions = [{ label: 'Publicar en Notion', value: AgentTaskType.POST_NOTION }];

export interface IAgentJob {
  _id?: string;
  id?: string;
  idTask: string;
  idAgentCard: string;
  messages: any[];
  response: any;
}
