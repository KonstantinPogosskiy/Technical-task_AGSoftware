export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
  task: Task | null;
}

export interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}