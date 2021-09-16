import { rm, mkdir } from 'fs/promises';
import { SimpleDB } from '../lib/simple-db';

describe('simple db', () => {
  const rootDir = '../store';

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('should check if new object is created and retrieves by the id', () => {
    const file = new SimpleDB(rootDir);
    const newFile = { exists: true };

    return file
      .save(newFile)
      .then(() => {
        return file.get(newFile.id);
      })
      .then((savedFile) => {
        expect(savedFile).toEqual(newFile);
        expect(savedFile.id).toEqual(newFile.id);
      });
  });
});
