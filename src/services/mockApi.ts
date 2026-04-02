import type { Task, Operation, TaskLog } from '@/types';

const TASKS_KEY = 'tasks';

function getTasks(): Task[] {
  return JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function processOperation(input: string, op: Operation): string {
  switch (op) {
    case 'uppercase': return input.toUpperCase();
    case 'lowercase': return input.toLowerCase();
    case 'reverse': return input.split('').reverse().join('');
    case 'word_count': return String(input.trim().split(/\s+/).filter(Boolean).length);
  }
}

export function createTask(userId: string, title: string, inputText: string, operation: Operation): Task {
  const now = new Date().toISOString();
  const task: Task = {
    id: crypto.randomUUID(),
    userId,
    title,
    inputText,
    operation,
    status: 'pending',
    result: null,
    logs: [{ timestamp: now, message: 'Task created with status: pending' }],
    createdAt: now,
    updatedAt: now,
  };
  const tasks = getTasks();
  tasks.unshift(task);
  saveTasks(tasks);
  return task;
}

export function runTask(taskId: string): void {
  // Simulate async processing: pending -> running -> success/failed
  setTimeout(() => {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    task.status = 'running';
    task.updatedAt = new Date().toISOString();
    task.logs.push({ timestamp: task.updatedAt, message: 'Worker picked up task. Status: running' });
    saveTasks(tasks);

    setTimeout(() => {
      const tasks2 = getTasks();
      const task2 = tasks2.find(t => t.id === taskId);
      if (!task2) return;
      try {
        const result = processOperation(task2.inputText, task2.operation);
        task2.status = 'success';
        task2.result = result;
        task2.updatedAt = new Date().toISOString();
        task2.logs.push({ timestamp: task2.updatedAt, message: `Processing complete. Result: ${result}` });
        task2.logs.push({ timestamp: task2.updatedAt, message: 'Task status: success' });
      } catch {
        task2.status = 'failed';
        task2.updatedAt = new Date().toISOString();
        task2.logs.push({ timestamp: task2.updatedAt, message: 'Processing failed. Status: failed' });
      }
      saveTasks(tasks2);
    }, 2000 + Math.random() * 1000);
  }, 500 + Math.random() * 500);
}

export function getUserTasks(userId: string): Task[] {
  return getTasks().filter(t => t.userId === userId);
}

export function getTaskById(taskId: string): Task | undefined {
  return getTasks().find(t => t.id === taskId);
}
