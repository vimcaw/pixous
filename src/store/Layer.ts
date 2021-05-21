import { types, SnapshotOut, Instance } from 'mobx-state-tree';

const Layer = types
  .model({
    id: types.identifier,
    name: types.string,
    visible: true,
    opacity: 1,
  })
  .actions(self => ({
    setName(value: string) {
      self.name = value;
    },
    switchVisible() {
      self.visible = !self.visible;
    },
    setOpacity(value: number) {
      self.opacity = value;
    },
  }));

export type ILayer = Instance<typeof Layer>;
export type ILayerSnapshotOut = SnapshotOut<typeof Layer>;

export default Layer;
