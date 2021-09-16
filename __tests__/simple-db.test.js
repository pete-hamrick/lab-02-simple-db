import { rm, mkdir } from 'fs/promises';
import { SimpleDB } from '../lib/simple-db';

describe('simple db', () => {
  const rootDir = '../store/';

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('should check if new object has a unique id', () => {
    const file = new SimpleDB(rootDir);
    const newFile = { exists: true };

    return file.save(newFile).then(() => {
      expect(newFile.id).toEqual(expect.any(String));
    });
  });

  it('should check if new object is saved', () => {
    const file = new SimpleDB(rootDir);
    const newFile = { exists: true };

    return file.save(newFile).then(() => {
      expect(newFile).toEqual(expect.any(String));
    });
  });
});
