export interface Task {
    id?: string;
    name: string;
    category?: string;
    interval: number | string;
    onTick: () => void;
    status?: boolean;
}
