import { rm, mkdir } from 'fs/promises';
import { SimpleDB } from '../lib/simple-db';

describe('simple db', () => {
  const rootDir = '../store';

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('should check if a new file has been created', () => {
    const newFile = new SimpleDB(rootDir);
    const fileData = 'hello, world';

    return newFile
      .keep(fileData)
      .then(() => {
        return newFile.tell();
      })
      .then((message) => {
        expect(message).toEqual(fileData);
      });
  });
  it.skip('should see if new file has an id', () => {});
});
