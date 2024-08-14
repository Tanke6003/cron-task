import { CronTaskScheduler, Task } from '../src/index'
describe('CronTaskScheduler', () => {
    let scheduler: CronTaskScheduler;
  
    beforeEach(() => {
      scheduler = new CronTaskScheduler();
      jest.useFakeTimers(); 
    });
  
    afterEach(() => {
      jest.useRealTimers(); 
    });
  
    test('should add a task', () => {
      const onTickMock = jest.fn(); 
      const task = scheduler.addTask({
        name: 'Test Task',
        interval: 1000,
        onTick: onTickMock,
      });
      
      const taskId = task.id ?? '';
      expect(scheduler.getTaskById(taskId)).toBeDefined();
    });
    //getTasks
    test('should have one task',()=>{
        const onTickMock = jest.fn();
        scheduler.addTask({
            name: 'Test Task',
            interval: 1000,
            onTick: onTickMock,
          });
        let tasks:Task[] = scheduler.getTasks()
        expect(tasks.length).toBe(1)
          
    })
    

  });
  