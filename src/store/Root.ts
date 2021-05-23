import { types } from 'mobx-state-tree';
import { nanoid } from 'nanoid';
import Document, { IDocumentSnapshotOut } from '@store/Document';

const Root = types
  .model({
    activeDocument: types.optional(types.maybe(types.reference(Document)), undefined),
    documents: types.optional(types.array(Document), []),
  })
  .actions(self => ({
    addDocument(document: Omit<IDocumentSnapshotOut, 'id' | 'layers'> & { image?: string }) {
      const newDocument = Document.create({
        id: nanoid(),
        ...document,
        ...(document.image
          ? { layers: [{ id: nanoid(), name: document.name, image: document.image }] }
          : {}),
      });
      self.documents.push(newDocument);
      self.activeDocument = newDocument;
    },
  }));

export default Root;
