export interface HistoryItem<State = any> {
  state: State;
  description: keyof Translation;
}

export interface History<State = any> {
  past: HistoryItem<State>[];
  present: HistoryItem<State>;
  future: HistoryItem<State>[];
}
