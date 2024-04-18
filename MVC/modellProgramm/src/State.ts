import {States} from './commands';

class State {
  stateMachine: States[] = [];
  constructor() {}

  logState(state: States) {
    this.stateMachine.push(state);
  }
}
