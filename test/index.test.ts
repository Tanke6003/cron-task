import { CronTaskScheduler, Task } from '../src/index'

describe('CronTaskScheduler', () => {
    let scheduler: CronTaskScheduler;
    const onTickMock = jest.fn(); 
    let task:Task = {
      name: 'Test Task',
      interval: 1000,
      onTick: onTickMock,
    }
    beforeEach(() => {
      scheduler = new CronTaskScheduler();
      task = scheduler.addTask(task);
      jest.useFakeTimers(); 
    });
  
    afterEach(() => {
      jest.useRealTimers(); 
    });
  
    test('should add a task', () => {
      let task2:Task  = {
        name: 'Test Task 2',
        interval: 1000,
        onTick: onTickMock,
      }
      task2 = scheduler.addTask(task2);
      expect(scheduler.getTaskById(task.id!)).toBeDefined();
    });
    //getTasks
    test('should have one task',()=>{
        let tasks:Task[] = scheduler.getTasks()
        expect(tasks.length).toBe(1)
          
    })
    //getTaskById
    test('should get a task by id',()=>{
      task = scheduler.addTask(task);
      let taskget = scheduler.getTaskById(task.id!)
      expect(taskget).toBe(task);
    })
    test('should remove a task by id',()=>{
      scheduler.removeTaskById(task.id!)
      let tasks = scheduler.getTasks();
      let findtask = tasks.find((x)=>x.id === task.id)
      expect(findtask).toBe(undefined);
    })
    test('should return an error when trying to remove a task by id', () => {
      expect(() => {
          scheduler.removeTaskById('failid');
      }).toThrow('Task not found');
  });
  
    

  });
  