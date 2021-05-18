import { createEntityAdapter, EntityState, nanoid } from '@reduxjs/toolkit';
import i18next from 'i18next';

export interface Layer {
  name: string;
  visible: boolean;
  opacity: number;
}

const layerAdapter = createEntityAdapter<Layer>();

export type LayerEntry = EntityState<Layer>;

export default layerAdapter;

export function getInitialLayer(): LayerEntry {
  const id = nanoid();
  return {
    ids: [id],
    entities: {
      [id]: {
        name: `${i18next.t('layer')} 1`,
        visible: true,
        opacity: 1,
      },
    },
  };
}
