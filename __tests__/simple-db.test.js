import { rm, mkdir, stat, readdir } from 'fs/promises';
import { SimpleDB } from '../lib/simple-db';

describe('simple db', () => {
    const rootDir = '../store';

    beforeEach(() => {
        return rm(rootDir, { force: true, recursive: true }).then(() => {
            return mkdir(rootDir, { recursive: true });
        });
    });

    it('should check if new object has an id', () => {
        const newDB = new SimpleDB(rootDir);
        const newFile = { exists: true };

        return newDB.save(newFile).then((id) => {
            expect(id).toEqual(expect.any(String));
        });
    });

    it('should save new object then return it', () => {
        const newDB = new SimpleDB(rootDir);
        const newFile = { exists: true };

        return newDB.save(newFile).then((id) => {
            return newDB.get(id).then((res) => {
                expect(res).toEqual({ exists: true, id: expect.any(String) });
            });
        });
    });

    it('should return null for a non-existant id', () => {
        const newDB = new SimpleDB(rootDir);

        return newDB.get('nonId').then((res) => {
            expect(res).toEqual(null);
        });
    });

    xit('should get the whole store folder using the getAll method', () => {
        const newDB = new SimpleDB(rootDir);
        const source = rootDir;

        return newDB
            .getAll()
            .then(() => {
                return readdir(source);
            })
            .then((files) => {
                expect(files).toEqual(['Kj87Cb3uL1.json']);
            });
    });
});
