export interface Task {
    id?: string; // Unique identifier for the task
    name: string;
    category?: string;
    interval: number | string; // Interval in milliseconds or cron expression
    onTick: () => void | Promise<void> ; // Function to execute on each tick
    status?:boolean;
}
