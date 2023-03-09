import { Storage, getStorage } from './localStorage';

export const trashCompleted = () => {
  const storedTasks = getStorage();

  const uncompletedTask = storedTasks.filter(
    (task) => task.completed === false,
  );
  Storage(uncompletedTask);
};

export default trashCompleted;