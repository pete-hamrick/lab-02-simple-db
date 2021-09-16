//TODO

//constructor
//.save(<objectToSave>)
//.get(<id>)
//.getAll()

//TODO stretch:
//.remove(id)
//.update(objToUpdate)
//Refactor getObjPath so that other methods can call this to make a file path

import { writeFile, readFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDB {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  save(object) {
    object.id = shortid.generate();
    const fileName = `File-${object.id}.json`;
    this.createdFile = path.join(this.rootDir, fileName);
    return writeFile(this.createdFile, JSON.stringify(object));
  }

  get(id) {
    const source = `../store/${id}.json`;
    return readFile(source)
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
    return readdir(this.rootDir).then((files) => {
      return Promise.all(files.map((file) => {}));
    });
    //need Promise.all
  }
}
