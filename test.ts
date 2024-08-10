import { Task, TaskScheduler } from "./lib";
import * as os from 'os';
import * as readline from 'readline';

(() => {
    let scheduler = new TaskScheduler();

    let task1: Task = {
        name: "task1",
        category: "cat1",
        interval: 1000,
        onTick: () => {
            console.log("task1 tick");
        }
    };

    let task2: Task = {
        name: "task2",
        category: "cat2",
        interval: 2000,
        onTick: () => {
            console.log(os.hostname());
        }
    };

    scheduler.addTask(task1);
    scheduler.addTask(task2);
    scheduler.startAllTasks();


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Press Enter to stop cat1 task...\n', () => {
        scheduler.stopAllTasksByCategory("cat1");
        scheduler.getTasks().forEach(task => {
            console.log(task);
        });
        rl.close(); 
        
    });
    
    process.on('SIGINT', () => {
        scheduler.stopAllTasks();
        process.exit();
    });
})();
