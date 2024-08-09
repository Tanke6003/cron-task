# Cron-task

`TaskScheduler` es una clase para gestionar y programar tareas en Node.js. Puedes usarla para ejecutar tareas a intervalos regulares especificados en milisegundos o con expresiones cron.

## Installation

```bash
npm i cron-task
```
## Usage
### Importing
```typescript
import { TaskScheduler, Task } from 'task-scheduler';
```
### Defining a task
Create a task object that follows the Task interface:
```typescript
const myTask: Task = {
  name: 'exampleTask',
  category: 'exampleCategory', // category is a optional property
  interval: '*/5 * * * *', // Cron expression to run every 5 minutes
  onTick: () => {
    console.log('Task executed!');
  }
};
```
