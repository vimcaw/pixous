import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export interface Layer {
  name: string;
}

const layerAdapter = createEntityAdapter<Layer>();

export type LayerEntry = EntityState<Layer>;

export default layerAdapter;
