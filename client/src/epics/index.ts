import { combineEpics } from 'redux-observable';
import {
  addBookToSelectionEpic,
  createSelectionEpic,
  fetchOneBookEpic,
  fetchSelectionEpic,
  removeBookFromSelectionEpic,
  removeSelectionEpic,
} from './epics';

export const rootEpic = combineEpics(
  fetchSelectionEpic,
  addBookToSelectionEpic,
  createSelectionEpic,
  removeSelectionEpic,
  removeBookFromSelectionEpic,
 fetchOneBookEpic,

);
