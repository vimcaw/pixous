import { createEntityAdapter, EntityId, EntityState, nanoid } from '@reduxjs/toolkit';

import { History } from './history';
import layer, { LayerEntry } from './layer';

export interface Size {
  width: number;
  height: number;
}

export interface BaseDocument {
  id: EntityId;
}

export interface DocumentState {
  name: string;
  size: Size;
  layers: LayerEntry;
}

export type Document = BaseDocument & History<DocumentState>;

const documentAdapter = createEntityAdapter<Document>();

export type DocumentEntry = EntityState<Document>;

export default documentAdapter;

export function getInitialDocument(data: Pick<DocumentState, 'name' | 'size'>): Document {
  return {
    id: nanoid(),
    past: [],
    present: {
      state: {
        ...data,
        layers: layer.getInitialState(),
      },
      description: 'newFile',
    },
    future: [],
  };
}
