// types.ts
export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  priority: number;
  category?: string;
  appUserId: number;
  assignedToUserId?: number;
}
