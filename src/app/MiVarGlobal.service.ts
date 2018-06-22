import { Injectable } from "@angular/core";

@Injectable()
export class VarGlobal {
    globalAny: any;
    avatar: string;
  
    constructor() {
    }
  
    setVarGlobal(value) {
      this.globalAny = value;
    }
  
    setAvatar(value) {
      this.avatar = value;
    }

    getsetVarGlobal() {
      return this.globalAny;
    }

    getAvatar() {
      return this.avatar;
    }
  }