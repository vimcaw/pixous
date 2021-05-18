export interface HistoryItem<State = any> {
  state: State;
  description: keyof Translation;
}

export interface History<State = any> {
  past: HistoryItem<State>[];
  present: HistoryItem<State>;
  future: HistoryItem<State>[];
}

export const selectState = (rootState: History) => rootState.present.state;
