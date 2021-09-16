import { rm, mkdir, stat, readdir } from 'fs/promises';
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
      expect(newFile).toEqual(expect.any(Object));
    });
  });

  it('should get file by id from store folder', () => {
    const file = new SimpleDB(rootDir);
    const source = '../store/Kj87Cb3uL1.json';
    const id = source.id;
    return file
      .get(id)
      .then(() => {
        return stat(rootDir);
      })
      .then((stats) => {
        expect(stats.isFile()).toBe(true);
      })
      .catch((err) => {
        return console.error(err);
      });
  });

  it('should get the whole store folder using the getAll method', () => {
    const file = new SimpleDB(rootDir);
    const source = rootDir;

    return file
      .getAll()
      .then(() => {
        return readdir(source);
      })
      .then((files) => {
        expect(files).toEqual(['Kj87Cb3uL1.json']);
      });
  });
});
