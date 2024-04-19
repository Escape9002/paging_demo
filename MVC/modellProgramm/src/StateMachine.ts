import States, {MMUError} from './commands';
import {ErrorBase} from './ErrorBase';

export default class StateMachine {
  stateMachine: States[] = [];
  constructor() {}

  logState(state: States) {
    this.stateMachine.push(state);

    let lol = state.context.value;
    let lolval = typeof lol;
    console.log(lol);

    if (lol instanceof MMUError) {
      //TODO this object is an object, not an MMUError. WHY
      console.log(state);
      throw state.context.value;
    }
  }
}
