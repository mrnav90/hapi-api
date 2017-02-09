'use strict';

import { Document } from 'camo';

export default class BaseModel extends Document {
  constructor() {
    super();
  }

  static create(data) {
    return super.create(data).save();
  }
}
