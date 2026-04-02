export type Operation = 'uppercase' | 'lowercase' | 'reverse' | 'word_count';

export type TaskStatus = 'pending' | 'running' | 'success' | 'failed';

export interface TaskLog {
  timestamp: string;
  message: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  inputText: string;
  operation: Operation;
  status: TaskStatus;
  result: string | null;
  logs: TaskLog[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const OPERATION_LABELS: Record<Operation, string> = {
  uppercase: 'Uppercase',
  lowercase: 'Lowercase',
  reverse: 'Reverse String',
  word_count: 'Word Count',
};
