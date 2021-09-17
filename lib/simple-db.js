import { writeFile, readFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDB {
    constructor(rootDir) {
        this.path = rootDir;
    }

    save(object) {
        object.id = shortid.generate();
        const fileName = `${object.id}.json`;
        this.createdFile = path.join(this.path, fileName);
        return writeFile(this.createdFile, JSON.stringify(object)).then(() => {
            return fileName;
        });
    }

    get(id) {
        const source = path.join(this.path, id);
        return readFile(source, 'utf-8')
            .then((contents) => {
                return JSON.parse(contents);
            })
            .catch((err) => {
                if (err.code === 'ENOENT') {
                    return null;
                }
                throw err;
            });
    }

    getAll() {
        return readdir(this.path).then((files) => {
            return Promise.all(files.map((file) => {}));
        });
        //need Promise.all
    }
}
