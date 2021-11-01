import { types } from 'mobx-state-tree';
import { nanoid } from 'nanoid';
import Document, { IDocumentSnapshotOut } from '@store/Document';
import ViewOptions from '@store/ViewOptions';

const Root = types
  .model({
    activeDocument: types.optional(types.maybe(types.reference(Document)), undefined),
    documents: types.optional(types.array(Document), []),
  })
  .actions(self => ({
    addDocument(
      document: Pick<IDocumentSnapshotOut, 'name' | 'width' | 'height'> & { image?: string }
    ) {
      const newDocument = Document.create({
        id: nanoid(),
        ...document,
        ...(document.image
          ? { layers: [{ id: nanoid(), name: document.name, image: document.image }] }
          : {}),
        viewOptions: ViewOptions.create(),
      });
      self.documents.push(newDocument);
      self.activeDocument = newDocument;
    },
    closeDocument() {
      if (!self.activeDocument) return;
      const index = self.documents.indexOf(self.activeDocument);
      self.activeDocument = undefined;
      if (!index) return;
      self.documents.splice(index, 1);
    },
  }));

export default Root;
