'use strict'

let _instance = null;

class Qoco{

  constructor() {
    if (!_instance)
      _instance = this;

    return _instance;
  }


  getLuggage(customerId){


  }

}

module.exports = Qoco;
