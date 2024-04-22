import States, {MMUError} from './commands';

export default class StateMachine {
  stateMachine: States[] = [];
  constructor() {}

  logState(state: States) {
    this.stateMachine.push(state);

    if (state.context.value instanceof Error) {
      console.log(state);
      throw state.context.value as MMUError;
    }
  }
}
