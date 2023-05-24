import { DraggableLocation } from 'react-beautiful-dnd';
import { ITask } from '../types/dto.types';
export interface IMoveResult {
  [key: string]: ITask[];
}
/**
 * Moves an item from one list to another list.
 */
const move = (
  source: ITask[],
  destination: ITask[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result: IMoveResult = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default move;
