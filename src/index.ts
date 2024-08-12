import { v4 as uuidv4 } from 'uuid'; // You can use this library to generate unique IDs
import { Task } from './task';


class CronTaskScheduler {
    private tasks: Task[] = [];
    private intervals: { [id: string]: NodeJS.Timeout } = {};

    public addTask(task: Omit<Task, 'id' | 'status'>): Task {
        try {
            if (!task.name || !task.onTick) {
                throw new Error('Task must have a name and an onTick function');
            }

            const id = uuidv4(); // Generate a unique ID for the task
            const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
            if (intervalMs <= 0) {
                throw new Error('Invalid interval');
            }
            const status = true;
            const newTask: Task = { ...task, id,status }; 
            this.tasks.push(newTask);
            const intervalId = setInterval(newTask.onTick, intervalMs);
            this.intervals[newTask.id?? ""] = intervalId;
            console.log('Task added:', newTask);

            return newTask; 
        } catch (error: any) {
            throw new Error('Error adding task: ' + error.message);
        }
    }
    public removeTaskById(id: string): void {
        try {
            const index = this.tasks.findIndex(task => task.id === id);
            if (index === -1) throw new Error('Task not found');
            clearInterval(this.intervals[id]);
            delete this.intervals[id];
            this.tasks.splice(index, 1);
        } catch (error: any) {
            throw new Error('Error removing task by id: ' + error.message);
        }
    }
    public updateTaskById(id: string, task: Omit<Task, 'id'>): Task {
        try {
            const index = this.tasks.findIndex(task => task.id === id);
            if (index === -1) throw new Error('Task not found');

            const updatedTask = { ...task, id };
            this.tasks[index] = updatedTask;
            const intervalMs = typeof updatedTask.interval === 'string' ? this.cronToMs(updatedTask.interval) : updatedTask.interval;
            if (intervalMs <= 0) throw new Error('Invalid interval');

            clearInterval(this.intervals[id]);
            const intervalId = setInterval(updatedTask.onTick, intervalMs);
            this.intervals[id] = intervalId;

            return updatedTask;
        } catch (error: any) {
            throw new Error('Error updating task by id: ' + error.message);
        }
    }
    public startTaskById(id: string): void {
        try {
            const task = this.tasks.find(task => task.id === id);
            if (!task) throw new Error('Task not found');

            if (this.intervals[id]) return;

            const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
            if (intervalMs <= 0) throw new Error('Invalid interval');
            task.status = true;
            const intervalId = setInterval(task.onTick, intervalMs);
            this.intervals[id] = intervalId;
        } catch (error: any) {
            throw new Error('Error starting task by id: ' + error.message);
        }
    }
    public getTaskById(id: string): Task | undefined {
        try {
            return this.tasks.find(task => task.id === id);
        } catch (error: any) {
            throw new Error('Error getting task by id: ' + error.message);
        }
    }
    public removeTaskByName(name: string): void {
        try {
            const task = this.tasks.find(task => task.name === name);
            if (!task) throw new Error('Task not found');

            clearInterval(this.intervals[task.id?? ""]);	
            delete this.intervals[task.id?? ""];    
            this.tasks = this.tasks.filter(t => t.id !== task.id);
        } catch (error: any) {
            throw new Error('Error removing task by name: ' + error.message);
        }
    }
    public removeTasksByCategory(category: string): void {
        try {
            const tasksToRemove = this.tasks.filter(task => task.category === category);
            tasksToRemove.forEach(task => this.removeTaskById(task.id?? ""));
        } catch (error: any) {
            throw new Error('Error removing tasks by category: ' + error.message);
        }
    }
    public removeAllTasks(): void {
        try {
            this.tasks.forEach(task => clearInterval(this.intervals[task.id?? ""]));
            this.tasks = [];
            this.intervals = {};
        } catch (error: any) {
            throw new Error('Error removing all tasks: ' + error.message);
        }
    }
    public getTasks(): Task[] {
        return this.tasks;
    }
    public getTasksByCategory(category: string): Task[] {
        try {
            return this.tasks.filter(task => task.category === category);
        } catch (error: any) {
            throw new Error('Error getting tasks by category: ' + error.message);
        }
    }
    public getTasksByName(name: string): Task[] {
        try {
            return this.tasks.filter(task => task.name === name);
        } catch (error: any) {
            throw new Error('Error getting tasks by name: ' + error.message);
        }
    }
    public startTaskByName(name: string): void {
        try {
            const task = this.tasks.find(task => task.name === name);
            if (!task) throw new Error('Task not found');
            task.status = true;
            if (this.intervals[task.id??""]) return; 

            const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
            if (intervalMs <= 0) throw new Error('Invalid interval');

            const intervalId = setInterval(task.onTick, intervalMs);
            this.intervals[task.id??""] = intervalId;
        } catch (error: any) {
            throw new Error('Error starting task by name: ' + error.message);
        }
    }
    public stopTaskByName(name: string): void {
        try {
            const task = this.tasks.find(task => task.name === name);
            if (!task) throw new Error('Task not running');
            task.status = false;
            clearInterval(this.intervals[task.id??""]);
            delete this.intervals[task.id??""];
        } catch (error: any) {
            throw new Error('Error stopping task by name: ' + error.message);
        }
    }
    public stopAllTasksByCategory(category: string): void {
        try {
            const tasksToStop = this.tasks.filter(task => task.category === category);
            tasksToStop.forEach(task => this.stopTaskByName(task.name));
        } catch (error: any) {
            throw new Error('Error stopping all tasks by category: ' + error.message);
        }
    }
    public startAllTasksByCategory(category: string): void {
        try {
            const tasksToStart = this.tasks.filter(task => task.category === category);
            tasksToStart.forEach(task => this.startTaskByName(task.name));
        } catch (error: any) {
            throw new Error('Error starting all tasks by category: ' + error.message);
        }
    }
    public startAllTasks(): void {
        try {
            this.tasks.forEach(task => {
                if (!this.intervals[task.id??""]) {
                    const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
                    if (intervalMs <= 0) throw new Error('Invalid interval');
                    task.status = true;
                    const intervalId = setInterval(task.onTick, intervalMs);
                    this.intervals[task.id??""] = intervalId;
                }
            });
        } catch (error: any) {
            throw new Error('Error starting all tasks: ' + error.message);
        }
    }
    public stopAllTasks(): void {
        try {
            Object.keys(this.intervals).forEach(id =>{

                clearInterval(this.intervals[id])});
            this.intervals = {};
        } catch (error: any) {
            throw new Error('Error stopping all tasks: ' + error.message);
        }
    }
    private cronToMs(cronExp: string): number {
        try {
            const parts = cronExp.split(' ');
            if (parts.length !== 5) throw new Error('Invalid cron expression');
    
            const [minute, hour, dayOfMonth, month, dayOfWeek] = parts.map(p => {
                if (p === '*') return null;
                if (p.includes('/')) return parseInt(p.split('/')[1], 10); // Handle step values like '*/5'
                return parseInt(p, 10);
            });
    
            if (minute !== null && hour === null && dayOfMonth === null && month === null && dayOfWeek === null) {
                // Handle cases like '*/5 * * * *' - Execute every specified minute interval
                return minute * 60 * 1000;
            }
    
            if (minute === null && hour !== null && dayOfMonth === null && month === null && dayOfWeek === null) {
                // Execute every specified hour
                return hour * 60 * 60 * 1000;
            }
    
            if (minute !== null && hour !== null && dayOfMonth === null && month === null && dayOfWeek === null) {
                // Execute every specified hour and minute
                return (hour * 60 * 60 * 1000) + (minute * 60 * 1000);
            }
    
            if (minute === null && hour === null && dayOfMonth !== null && month === null && dayOfWeek === null) {
                // Execute every specified day
                return dayOfMonth * 24 * 60 * 60 * 1000;
            }
    
            if (minute === null && hour === null && dayOfMonth === null && month !== null && dayOfWeek === null) {
                // Execute every specified month
                return month * 30 * 24 * 60 * 60 * 1000;
            }
    
            if (minute === null && hour === null && dayOfMonth === null && month === null && dayOfWeek !== null) {
                // Execute every specified day of the week
                return dayOfWeek * 7 * 24 * 60 * 60 * 1000;
            }
    
            throw new Error('Unsupported cron expression');
        } catch (error: any) {
            throw new Error('Error converting cron expression to milliseconds: ' + error.message);
        }
    }
    
}

export { CronTaskScheduler, Task };
