export interface Task {
    id?: string; 
    name: string;
    category?: string;
    interval: number | string; 
    onTick: () => void | Promise<void> ; 
    status?:boolean;
}
