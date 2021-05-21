import { types } from 'mobx-state-tree';
import { nanoid } from 'nanoid';
import Document, { IDocumentSnapshotOut } from '@store/Document';

const Root = types
  .model({
    activeDocument: types.optional(types.maybe(types.reference(Document)), undefined),
    documents: types.optional(types.array(Document), []),
  })
  .actions(self => ({
    addDocument(document: Omit<IDocumentSnapshotOut, 'id' | 'layers'>) {
      const newDocument = Document.create({ id: nanoid(), ...document });
      self.documents.push(newDocument);
      self.activeDocument = newDocument;
    },
  }));

export default Root;
