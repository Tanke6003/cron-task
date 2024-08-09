"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskScheduler = void 0;
class TaskScheduler {
    constructor() {
        this.tasks = [];
        this.intervals = {};
    }
    addTask(task) {
        try {
            if (!task.name || !task.onTick) {
                throw new Error('Task must have a name and an onTick function');
            }
            const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
            if (intervalMs <= 0) {
                throw new Error('Invalid interval');
            }
            this.tasks.push(task);
            const intervalId = setInterval(task.onTick, intervalMs);
            this.intervals[task.name] = intervalId;
        }
        catch (error) {
            throw new Error('Error adding task:' + error.message);
        }
    }
    removeTaskByName(name) {
        try {
            const index = this.tasks.findIndex(task => task.name === name);
            if (index === -1)
                throw new Error('Task not found');
            clearInterval(this.intervals[name]);
            delete this.intervals[name];
            this.tasks.splice(index, 1);
        }
        catch (error) {
            throw new Error('Error removing task by name:' + error.message);
        }
    }
    removeTasksByCategory(category) {
        try {
            const tasksToRemove = this.tasks.filter(task => task.category === category);
            tasksToRemove.forEach(task => this.removeTaskByName(task.name));
        }
        catch (error) {
            throw new Error('Error removing tasks by category:' + error.message);
        }
    }
    removeAllTasks() {
        try {
            this.tasks.forEach(task => clearInterval(this.intervals[task.name]));
            this.tasks = [];
            this.intervals = {};
        }
        catch (error) {
            throw new Error('Error removing all tasks:' + error.message);
        }
    }
    getTasks() {
        return this.tasks;
    }
    getTasksByCategory(category) {
        try {
            return this.tasks.filter(task => task.category === category);
        }
        catch (error) {
            throw new Error('Error getting tasks by category:' + error.message);
        }
    }
    getTasksByName(name) {
        try {
            return this.tasks.filter(task => task.name === name);
        }
        catch (error) {
            throw new Error('Error getting tasks by name:' + error.message);
        }
    }
    startTaskByName(name) {
        try {
            const task = this.tasks.find(task => task.name === name);
            if (!task)
                throw new Error('Task not found');
            if (this.intervals[name])
                return; // La tarea ya está en ejecución
            const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
            if (intervalMs <= 0)
                throw new Error('Invalid interval');
            const intervalId = setInterval(task.onTick, intervalMs);
            this.intervals[name] = intervalId;
        }
        catch (error) {
            throw new Error('Error starting task by name:' + error.message);
        }
    }
    stopTaskByName(name) {
        try {
            if (!this.intervals[name])
                throw new Error('Task not running');
            clearInterval(this.intervals[name]);
            delete this.intervals[name];
        }
        catch (error) {
            throw new Error('Error stopping task by name:' + error.message);
        }
    }
    stopAllTasksByCategory(category) {
        try {
            const tasksToStop = this.tasks.filter(task => task.category === category);
            tasksToStop.forEach(task => this.stopTaskByName(task.name));
        }
        catch (error) {
            throw new Error('Error stopping all tasks by category:' + error.message);
        }
    }
    startAllTasksByCategory(category) {
        try {
            const tasksToStart = this.tasks.filter(task => task.category === category);
            tasksToStart.forEach(task => this.startTaskByName(task.name));
        }
        catch (error) {
            throw new Error('Error starting all tasks by category:' + error.message);
        }
    }
    startAllTasks() {
        try {
            this.tasks.forEach(task => {
                if (!this.intervals[task.name]) {
                    const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
                    if (intervalMs <= 0)
                        throw new Error('Invalid interval');
                    const intervalId = setInterval(task.onTick, intervalMs);
                    this.intervals[task.name] = intervalId;
                }
            });
        }
        catch (error) {
            throw new Error('Error starting all tasks:' + error.message);
        }
    }
    stopAllTasks() {
        try {
            Object.keys(this.intervals).forEach(name => clearInterval(this.intervals[name]));
            this.intervals = {};
        }
        catch (error) {
            throw new Error('Error stopping all tasks:' + error.message);
        }
    }
    cronToMs(cronExp) {
        try {
            const parts = cronExp.split(' ');
            if (parts.length !== 5)
                throw new Error('Invalid cron expression');
            const [minute, hour, dayOfMonth, month, dayOfWeek] = parts.map(p => p === '*' ? null : parseInt(p, 10));
            if (minute !== null && hour === null && dayOfMonth === null && month === null && dayOfWeek === null) {
                // Execute every specified minute
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
        }
        catch (error) {
            throw new Error('Error converting cron expression to milliseconds:' + error.message);
        }
    }
}
exports.TaskScheduler = TaskScheduler;
