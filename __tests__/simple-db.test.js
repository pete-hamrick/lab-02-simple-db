import { rm, mkdir } from 'fs/promises';
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

    it('should get the whole store folder using the getAll method', () => {
        const newDB = new SimpleDB(rootDir);
        const file1 = { exists: true };
        const file2 = { exists: 'yes' };
        const expected = [
            { exists: true, id: expect.any(String) },
            { exists: 'yes', id: expect.any(String) },
        ];

        return newDB
            .save(file1)
            .then(() => {
                newDB.save(file2);
            })
            .then(() => {
                newDB.getAll().then((files) => {
                    expect(files).toEqual(expect.arrayContaining(expected));
                });
            });
    });
});
