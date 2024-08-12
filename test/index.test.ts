import { beforeEach, describe, it, expect } from 'node:test';
import { CronTaskScheduler, Task } from '../src/index';

describe('CronTaskScheduler', () => {
    let scheduler: CronTaskScheduler;

    beforeEach(() => {
        scheduler = new CronTaskScheduler();
    });

    describe('addTask', () => {
        it('should add a task to the scheduler', () => {
            const task: Omit<Task, 'id' | 'status'> & { cronExpression: string } = {
                name: 'Task 1',
                category: 'Category 1',
                onTick: () => {
                    console.log('Task 1 executed');
                },
                cronExpression: '* * * * *',
            };

            const addedTask = scheduler.addTask(task);

            expect(addedTask).toBeDefined();
            expect(addedTask.id).toBeDefined();
            expect(addedTask.status).toBe('stopped');
            if (addedTask.id) {
                expect(scheduler.getTaskById(addedTask.id)).toBe(addedTask);
            } else {
                throw new Error('Task ID is undefined');
            }
        });
    });

    // Add more tests for other methods of the CronTaskScheduler class

});