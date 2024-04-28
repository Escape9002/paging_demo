import States, {MMUError} from './commands';

export default class StateMachine {
  stateMachine: States[] = [];
  constructor() {}

  logState(state: States, consoleLog: boolean = false) {
    this.stateMachine.push(state);

    if (state.context.value instanceof Error && consoleLog) {
      console.log(
        '/// ERROR ///\n' +
          state.context.value.name +
          '\n' +
          state.context.value.message +
          '\n' +
          '/// ERROR ///\n' +
          '--------------\n' +
          'originating from:\n' +
          state.kind +
          '\n' +
          state.context.desc +
          '--------------'
      );
    }
  }
}
