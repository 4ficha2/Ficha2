import { Injectable } from "@angular/core";

@Injectable()
export class VarGlobal {
    globalAny: any;
  
    constructor() {
      //this.VarGlobal = "";
    }
  
    setVarGlobal(value) {
      this.globalAny = value;
    }
  
    getsetVarGlobal() {
      return this.globalAny;
    }
  
  }