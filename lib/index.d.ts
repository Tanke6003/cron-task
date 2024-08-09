interface Task {
    name: string;
    category?: string;
    interval: number | string;
    onTick: () => void;
}
declare class TaskScheduler {
    private tasks;
    private intervals;
    addTask(task: Task): void;
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
export { TaskScheduler, Task };
