export enum RouteNames {
  Page = 'page',
  Home = 'home',
  Profile = 'profile',
  SubscriptionPlan = 'plan',
  Words = 'my-words',
  Phrases = 'my-phrases',
  Verbs = 'my-verbs',
  Chat = 'my-chat',
  Scenarios = 'escenarios',
  Topics = 'topics',
  Lessons = 'lecciones',
  Info = 'informacion',
  // TODO quiza debo quitar CreateLesson de aquí
  CreateLesson = 'create-lesson',
  Admin = 'admin',
  Teacher = 'teacher',
  VoiceDictation = 'dictado',
  Discovery = 'ejemplos',
  Signup = 'signup',
  Signin = 'signin',
  Terms = 'terms',
  Main = 'main',
  Auth = 'auth',
  Stack = 'stack',
  ConversationDetails = 'conversation-details',
}

export const Endpoints = {
  GetUser: 'api/user',
  PostUser: 'api/user',
  AdminUser: 'api/admin/user',
  Admin: {
    Claims: 'api/admin/claims', // :email
  },
  ConversationCard: {
    TranslateConversation: 'api/conversation_card/translate',
    Conversation: 'api/conversation-ai-cards/conversation',
    ConversationQuery: 'api/conversation-ai-cards/conversation/query',
    AgentChat: 'api/conversation/agent/chat',
    ListModels: 'api/conversation/agent/list_models',
    Whisper: 'api/conversation/whisper',
  },

  Tasks: {
    Task: 'api/agent-tasks', // GET
    List: 'api/agent-tasks', // GET
    Save: 'api/agent-tasks', // POST
    Execute: 'api/agent-tasks/execute', // GET /:ID
  },
  Jobs: {
    ByTask: 'api/agent-jobs/task', // GET /:ID
    Job: 'api/agent-jobs', // GET
    List: 'api/agent-jobs', // GET
    Save: 'api/agent-jobs', // POST
    Execute: 'api/agent-jobs/execute', // GET /:ID
  },
  Notion: {
    ListDBs: 'api/notion/list-databases',
    ListPages: 'api/notion/list-pages',
    Save: 'api/notion/save', // POST
  },

  Lessons: {
    Lesson: 'api/lessonv2/lesson',
    QueryLessons: 'api/lessonv2/query',
  },
};

export enum AppHttpCode {
  GoodRefreshToken = 211,
  ErrorRefreshToken = 411,
}
