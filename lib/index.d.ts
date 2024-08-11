interface Task {
    id?: string;
    name: string;
    category?: string;
    interval: number | string;
    onTick: () => void;
}
declare class CronTaskScheduler {
    private tasks;
    private intervals;
    addTask(task: Omit<Task, 'id'>): Task;
    removeTaskById(id: string): void;
    getTaskById(id: string): Task | undefined;
    removeTaskByName(name: string): void;
    removeTasksByCategory(category: string): void;
    removeAllTasks(): void;
    getTasks(): Task[];
    getTasksByCategory(category: string): Task[];
    getTasksByName(name: string): Task[];
    startTaskByName(name: string): void;
    stopTaskByName(name: string): void;
    stopAllTasksByCategory(category: string): void;
    startAllTasksByCategory(category: string): void;
    startAllTasks(): void;
    stopAllTasks(): void;
    private cronToMs;
}
export { CronTaskScheduler, Task };
