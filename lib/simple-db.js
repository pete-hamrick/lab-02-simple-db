//TODO

//constructor
//.save(<objectToSave>)
//.get(<id>)
//.getAll()

//TODO stretch:
//.remove(id)
//.update(objToUpdate)
//Refactor getObjPath so that other methods can call this to make a file path

import { writeFile, readFile } from 'fs/promises';
import path from 'path';
// import shortid from 'shortid';

export class SimpleDB {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  save(object) {
    let objId = 0;
    objId++;
    object.id = objId;
    const fileName = `File-${object.id}.json`;
    this.createdFile = path.join(this.rootDir, fileName);
    return writeFile(this.createdFile, JSON.stringify(object));
  }

  get(id) {
    const fileName = `File-${id}.json`;
    this.createdFile = path.join(this.rootDir, fileName);
    return readFile(this.createdFile, 'utf-8')
      .then((data) => JSON.parse(data))
      .catch((err) => {
        if (err) {
          return null;
        }
        throw err;
      });
  }
}
