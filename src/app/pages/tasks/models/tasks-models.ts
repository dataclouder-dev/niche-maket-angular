export interface AgentTask {
  id: string;
  idAgentCard: string;
  name: string;
  description: string;
  status: string;
  idNotionDB: string;
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
