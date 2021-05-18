import { configureStore, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import document, { DocumentEntry, DocumentState, getInitialDocument } from './entries/document';
import { selectState } from './entries/history';

export interface RootState {
  activeDocument?: EntityId;
  document: DocumentEntry;
}

const { selectById } = document.getSelectors();

const selectLayer = (state: RootState, layerId: EntityId) => {
  const activeDocument = state.activeDocument
    ? selectById(state.document, state.activeDocument)
    : undefined;
  return activeDocument ? selectState(activeDocument).layers.entities[layerId] : undefined;
};

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
    switchLayerVisible(state, action: PayloadAction<EntityId>) {
      if (selectLayer(state, action.payload)) {
        selectLayer(state, action.payload).visible = !selectLayer(state, action.payload).visible;
      }
    },
  },
});

export const { createNewDocument, switchLayerVisible } = rootSlice.actions;

const selectActiveDocument = (state: RootState) =>
  state.activeDocument
    ? selectById(state.document, state.activeDocument)?.present.state
    : undefined;

export function useHasActiveDocument() {
  return useSelector((state: RootState) => state.activeDocument !== undefined);
}

export function useActiveDocument() {
  return useSelector(selectActiveDocument);
}

export function useActiveDocumentSize() {
  return useSelector((state: RootState) => selectActiveDocument(state)?.size);
}

export function useActiveLayerIds() {
  return useSelector((state: RootState) =>
    state.activeDocument
      ? selectById(state.document, state.activeDocument)?.present.state.layers.ids
      : undefined
  );
}

export function useLayerById(id: EntityId) {
  return useSelector((state: RootState) =>
    state.activeDocument
      ? selectById(state.document, state.activeDocument)?.present.state.layers.entities[id]
      : undefined
  );
}

const store = configureStore({
  reducer: rootSlice.reducer,
});

export default store;
