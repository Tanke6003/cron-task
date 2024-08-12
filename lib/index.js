"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronTaskScheduler = void 0;
const uuid_1 = require("uuid"); // You can use this library to generate unique IDs
class CronTaskScheduler {
    constructor() {
        this.tasks = [];
        this.intervals = {};
    }
    addTask(task) {
        var _a;
        try {
            if (!task.name || !task.onTick) {
                throw new Error('Task must have a name and an onTick function');
            }
            const id = (0, uuid_1.v4)(); // Generate a unique ID for the task
            const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
            if (intervalMs <= 0) {
                throw new Error('Invalid interval');
            }
            const status = true;
            const newTask = Object.assign(Object.assign({}, task), { id, status });
            this.tasks.push(newTask);
            const intervalId = setInterval(newTask.onTick, intervalMs);
            this.intervals[(_a = newTask.id) !== null && _a !== void 0 ? _a : ""] = intervalId;
            console.log('Task added:', newTask);
            return newTask;
        }
        catch (error) {
            throw new Error('Error adding task: ' + error.message);
        }
    }
    removeTaskById(id) {
        try {
            const index = this.tasks.findIndex(task => task.id === id);
            if (index === -1)
                throw new Error('Task not found');
            clearInterval(this.intervals[id]);
            delete this.intervals[id];
            this.tasks.splice(index, 1);
        }
        catch (error) {
            throw new Error('Error removing task by id: ' + error.message);
        }
    }
    updateTaskById(id, task) {
        try {
            const index = this.tasks.findIndex(task => task.id === id);
            if (index === -1)
                throw new Error('Task not found');
            const updatedTask = Object.assign(Object.assign({}, task), { id });
            this.tasks[index] = updatedTask;
            const intervalMs = typeof updatedTask.interval === 'string' ? this.cronToMs(updatedTask.interval) : updatedTask.interval;
            if (intervalMs <= 0)
                throw new Error('Invalid interval');
            clearInterval(this.intervals[id]);
            const intervalId = setInterval(updatedTask.onTick, intervalMs);
            this.intervals[id] = intervalId;
            return updatedTask;
        }
        catch (error) {
            throw new Error('Error updating task by id: ' + error.message);
        }
    }
    startTaskById(id) {
        try {
            const task = this.tasks.find(task => task.id === id);
            if (!task)
                throw new Error('Task not found');
            if (this.intervals[id])
                return;
            const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
            if (intervalMs <= 0)
                throw new Error('Invalid interval');
            task.status = true;
            const intervalId = setInterval(task.onTick, intervalMs);
            this.intervals[id] = intervalId;
        }
        catch (error) {
            throw new Error('Error starting task by id: ' + error.message);
        }
    }
    getTaskById(id) {
        try {
            return this.tasks.find(task => task.id === id);
        }
        catch (error) {
            throw new Error('Error getting task by id: ' + error.message);
        }
    }
    removeTaskByName(name) {
        var _a, _b;
        try {
            const task = this.tasks.find(task => task.name === name);
            if (!task)
                throw new Error('Task not found');
            clearInterval(this.intervals[(_a = task.id) !== null && _a !== void 0 ? _a : ""]);
            delete this.intervals[(_b = task.id) !== null && _b !== void 0 ? _b : ""];
            this.tasks = this.tasks.filter(t => t.id !== task.id);
        }
        catch (error) {
            throw new Error('Error removing task by name: ' + error.message);
        }
    }
    removeTasksByCategory(category) {
        try {
            const tasksToRemove = this.tasks.filter(task => task.category === category);
            tasksToRemove.forEach(task => { var _a; return this.removeTaskById((_a = task.id) !== null && _a !== void 0 ? _a : ""); });
        }
        catch (error) {
            throw new Error('Error removing tasks by category: ' + error.message);
        }
    }
    removeAllTasks() {
        try {
            this.tasks.forEach(task => { var _a; return clearInterval(this.intervals[(_a = task.id) !== null && _a !== void 0 ? _a : ""]); });
            this.tasks = [];
            this.intervals = {};
        }
        catch (error) {
            throw new Error('Error removing all tasks: ' + error.message);
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
            throw new Error('Error getting tasks by category: ' + error.message);
        }
    }
    getTasksByName(name) {
        try {
            return this.tasks.filter(task => task.name === name);
        }
        catch (error) {
            throw new Error('Error getting tasks by name: ' + error.message);
        }
    }
    startTaskByName(name) {
        var _a, _b;
        try {
            const task = this.tasks.find(task => task.name === name);
            if (!task)
                throw new Error('Task not found');
            task.status = true;
            if (this.intervals[(_a = task.id) !== null && _a !== void 0 ? _a : ""])
                return;
            const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
            if (intervalMs <= 0)
                throw new Error('Invalid interval');
            const intervalId = setInterval(task.onTick, intervalMs);
            this.intervals[(_b = task.id) !== null && _b !== void 0 ? _b : ""] = intervalId;
        }
        catch (error) {
            throw new Error('Error starting task by name: ' + error.message);
        }
    }
    stopTaskByName(name) {
        var _a, _b;
        try {
            const task = this.tasks.find(task => task.name === name);
            if (!task)
                throw new Error('Task not running');
            task.status = false;
            clearInterval(this.intervals[(_a = task.id) !== null && _a !== void 0 ? _a : ""]);
            delete this.intervals[(_b = task.id) !== null && _b !== void 0 ? _b : ""];
        }
        catch (error) {
            throw new Error('Error stopping task by name: ' + error.message);
        }
    }
    stopAllTasksByCategory(category) {
        try {
            const tasksToStop = this.tasks.filter(task => task.category === category);
            tasksToStop.forEach(task => this.stopTaskByName(task.name));
        }
        catch (error) {
            throw new Error('Error stopping all tasks by category: ' + error.message);
        }
    }
    startAllTasksByCategory(category) {
        try {
            const tasksToStart = this.tasks.filter(task => task.category === category);
            tasksToStart.forEach(task => this.startTaskByName(task.name));
        }
        catch (error) {
            throw new Error('Error starting all tasks by category: ' + error.message);
        }
    }
    startAllTasks() {
        try {
            this.tasks.forEach(task => {
                var _a, _b;
                if (!this.intervals[(_a = task.id) !== null && _a !== void 0 ? _a : ""]) {
                    const intervalMs = typeof task.interval === 'string' ? this.cronToMs(task.interval) : task.interval;
                    if (intervalMs <= 0)
                        throw new Error('Invalid interval');
                    task.status = true;
                    const intervalId = setInterval(task.onTick, intervalMs);
                    this.intervals[(_b = task.id) !== null && _b !== void 0 ? _b : ""] = intervalId;
                }
            });
        }
        catch (error) {
            throw new Error('Error starting all tasks: ' + error.message);
        }
    }
    stopAllTasks() {
        try {
            Object.keys(this.intervals).forEach(id => {
                clearInterval(this.intervals[id]);
            });
            this.intervals = {};
        }
        catch (error) {
            throw new Error('Error stopping all tasks: ' + error.message);
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
            throw new Error('Error converting cron expression to milliseconds: ' + error.message);
        }
    }
}
exports.CronTaskScheduler = CronTaskScheduler;
