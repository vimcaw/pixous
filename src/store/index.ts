import { configureStore, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import document, { DocumentEntry, DocumentState, getInitialDocument } from './entries/document';

export interface RootState {
  activeDocument?: EntityId;
  document: DocumentEntry;
}

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    activeDocument: undefined,
    document: document.getInitialState(),
  } as RootState,
  reducers: {
    setActiveDocument(state, action: PayloadAction<EntityId | undefined>) {
      state.activeDocument = action.payload;
    },
    createNewDocument(state, action: PayloadAction<Pick<DocumentState, 'name' | 'size'>>) {
      const newDocument = getInitialDocument(action.payload);
      document.addOne(state.document, newDocument);
      state.activeDocument = newDocument.id;
    },
  },
});

export const { createNewDocument } = rootSlice.actions;

const { selectById } = document.getSelectors();

export function useHasActiveDocument() {
  return useSelector((state: RootState) => state.activeDocument !== undefined);
}

export function useActiveDocument() {
  return useSelector((state: RootState) =>
    state.activeDocument
      ? selectById(state.document, state.activeDocument)?.present.state
      : undefined
  );
}

const store = configureStore({
  reducer: rootSlice.reducer,
});

export default store;
