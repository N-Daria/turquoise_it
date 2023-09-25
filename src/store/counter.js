import { makeObservable, observable, action } from "mobx";

class globalController {
  waitForAnswer = false;
  requests = 0;

  constructor() {
    makeObservable(this, {
      requests: observable,
      startRequest: action,
      stopRequest: action,
      waitForAnswer: observable,
    });
  }

  startRequest = () => {
    this.requests += 1;

    if (this.requests > 0) {
      this.waitForAnswer = true;
    }
  };

  stopRequest = () => {
    if (this.requests === 0) {
      return;
    }

    this.requests -= 1;

    if (this.requests === 0) {
      this.waitForAnswer = false;
    }
  };
}

export const globalControllerStore = new globalController();
