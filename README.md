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

// Add a task
scheduler.addTask({
  name: 'myTask',
  interval: '*/5 * * * *', // Run every 5 minutes
  onTick: () => {
    console.log('Task executed');
    // Task logic here
  },
});

// Start the task by name
scheduler.startTaskByName('myTask');

// Stop the task by name
scheduler.stopTaskByName('myTask');
```

## API

### `addTask(task: Task): void`

Adds a new task to the scheduler.

- `task`: Object describing the task with the following properties:
  - `name`: Unique name for the task.
  - `category` (optional): Task category.
  - `interval`: Interval in milliseconds or cron expression.
  - `onTick`: Function executed at each interval.

### Other methods

- `removeTaskByName(name: string): void`
- `removeTasksByCategory(category: string): void`
- `removeAllTasks(): void`
- `getTasks(): Task[]`
- `getTasksByCategory(category: string): Task[]`
- `getTasksByName(name: string): Task[]`
- `startTaskByName(name: string): void`
- `stopTaskByName(name: string): void`
- `stopAllTasksByCategory(category: string): void`

## Contribution

If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request.

Thanks for contributing!
