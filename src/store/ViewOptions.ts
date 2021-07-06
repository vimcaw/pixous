import { SnapshotOut, types } from 'mobx-state-tree';

const ViewOptions = types
  .model({
    scale: 1,
  })
  .actions(self => ({
    setScale(value: number) {
      self.scale = value;
    },
  }));
export default ViewOptions;

export type IViewOptions = SnapshotOut<typeof ViewOptions>;
