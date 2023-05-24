import { ITask } from '../types/dto.types';

const moveElInList = (
  list: Array<ITask>,
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default moveElInList;
