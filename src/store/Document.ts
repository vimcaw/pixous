import { SnapshotOut, types } from 'mobx-state-tree';
import Layer from '@store/Layer';
import { nanoid } from 'nanoid';
import i18next from 'i18next';
import ViewOptions from '@store/ViewOptions';

const Document = types
  .model({
    id: types.identifier,
    name: types.string,
    width: types.number,
    height: types.number,
    layers: types.optional(types.array(Layer), () => [
      { id: nanoid(), name: `${i18next.t('layer')} 1` },
    ]),
    viewOptions: ViewOptions,
  })
  .actions(self => ({
    setName(value: string) {
      self.name = value;
    },
    addLayer() {
      self.layers.push(
        Layer.create({ id: nanoid(), name: `${i18next.t('layer')} ${self.layers.length + 1}` })
      );
    },
  }));

export default Document;

export type IDocumentSnapshotOut = SnapshotOut<typeof Document>;
