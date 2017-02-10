'use strict';

import { Document } from 'camo';

export default class BaseModel extends Document {
  constructor() {
    super();
  }

  static create(data) {
    return this.create(data).save();
  }

  static findById(id) {
    return this.findOne({ _id: id });
  }
}
