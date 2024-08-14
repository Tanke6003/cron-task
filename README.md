# cron-task

`cron-task` is a module for scheduling tasks at specific time intervals using cron expressions or milliseconds. You can easily add, remove, start, and stop tasks.

## Installation

To install `cron-task`, run the following command:

```bash
npm install cron-task
```

## Usage

```javascript
const { CronTaskScheduler } = require('cron-task');
// Create an instance of the scheduler
const scheduler = new CronTaskScheduler();

// Add tasks with categories
const task1 = scheduler.addTask({
  name: 'myTask',
  interval: '1 * * * *', // Run every 1 minute
  onTick: () => {
    console.log('Task executed every minute');
  },
  category: 'category1'
});

const task2 = scheduler.addTask({
  name: 'myTask2',
  interval: 15000, // Run every 15 seconds
  onTick: () => {
    console.log('Task executed every 15 seconds');
  },
  category: 'category1'
});

const task3 = scheduler.addTask({
  name: 'myTask3',
  interval: 10000, // Run every 10 seconds
  onTick: () => {
    console.log('Task executed every 10 seconds');
  },
  category: 'category2'
});


// Print tasks by ID
console.log("Task by ID:", scheduler.getTaskById(task1.id));

// Wait for 30 seconds to allow tasks to execute
setTimeout(() => {
  // Update task interval
  const updatedTask = scheduler.updateTaskById(task1.id, {
    name: 'myTask',
    interval: '*/2 * * * *', // Update to run every 2 minutes
    onTick: () => {
      console.log('Updated task executed every 2 minutes');
    },
    category: 'category1'
  });
  console.log('Updated task:', updatedTask);

  // Stop specific task by name
  scheduler.stopTaskByName('myTask2');
  console.log('Task myTask2 stopped');

  // Start a task by name
  scheduler.startTaskByName('myTask2');
  console.log('Task myTask2 started again');

  // Stop all tasks
  scheduler.stopAllTasks();
  console.log('All tasks stopped');

  // Print remaining tasks to verify they were stopped
  console.log('Tasks after stopping all:', scheduler.getTasks());

  // Start all tasks by category
  scheduler.startAllTasksByCategory('category1');
  console.log('Started all tasks in category1');

  // Stop all tasks by category
  scheduler.stopAllTasksByCategory('category1');
  console.log('Stopped all tasks in category1');

  // Remove tasks by category
  scheduler.removeTasksByCategory('category1');
  console.log('Removed all tasks in category1');

  // Get tasks by category
  const tasksByCategory = scheduler.getTasksByCategory('category2');
  console.log('Tasks in category2:', tasksByCategory);

  // Get tasks by name
  const tasksByName = scheduler.getTasksByName('myTask3');
  console.log('Tasks with name myTask3:', tasksByName);

}, 30000); // Wait for 30 seconds

// Wait for another 60 seconds before performing more actions
setTimeout(() => {
  // Add and start a new task
  const task4 = scheduler.addTask({
    name: 'myTask4',
    interval: 5000, // Run every 5 seconds
    onTick: () => {
      console.log('Task executed every 5 seconds');
    },
    category: 'category3'
  });
  console.log('Added new task:', task4);

  // Wait and then stop a specific task by name
  setTimeout(() => {
    scheduler.stopTaskByName('myTask4');
    console.log('Task myTask4 stopped');

    // Remove a task by ID
    scheduler.removeTaskById(task4.id);
    console.log(`Task ${task4.id} removed`);

    // Print remaining tasks
    console.log('Tasks after removal:', scheduler.getTasks());
    // Remove all tasks
    scheduler.removeAllTasks();
    console.log('All tasks removed');

    // Print remaining tasks to verify removal
    console.log('Tasks after removal of all:', scheduler.getTasks());
  }, 20000); // Wait for 20 seconds
}, 60000); // Wait for 60 seconds

```

## API

### Task class

- `task`: Object describing the task with the following properties:
  - `id`: unique uuid for task (this not be send on creation)
  - `name`: Unique name for the task.
  - `category` (optional): Task category.
  - `interval`: Interval in milliseconds or cron expression.
  - `onTick`: Function executed at each interval.

### Methods
- `addTask(task: Omit<Task, 'id'>): Task`
- `getTasks(): Task[]`
- `getTaskById(id:string): void`
- `getTasksByName(name: string): Task[]`
- `getTasksByCategory(category: string): Task[]`
- `removeTaskById(id:string): void`
- `removeTaskByName(name: string): void`
- `removeTasksByCategory(category: string): void`
- `removeAllTasks(): void`
- `startTaskById(id: string): void`
- `startTaskByName(name: string): void`
- `stopTaskByName(name: string): void`
- `stopAllTasksByCategory(category: string): void`
- `updateTaskById(id:string): void`

### Cron Expression

```
* * * * * 
- - - - -
| | | | |
| | | | +---- Day of the week (0 - 7) (Sunday=0 or 7)
| | | +------ Month (1 - 12)
| | +-------- Day of the month (1 - 31)
| +---------- Hour (0 - 23)
+------------ Minute (0 - 59)
```
## Contribution

If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request.

Thanks for contributing!
