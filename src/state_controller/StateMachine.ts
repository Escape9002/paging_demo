import States, {MMUError} from './commands';

export default class StateMachine {
  stateMachine: States[] = [];
  constructor() {}

  logState(state: States, consoleLog: boolean = false) {
    this.stateMachine.push(state);

    if (state.context instanceof Error && consoleLog) {
      console.log(
        '/// ERROR ///\n' +
          state.context +
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
