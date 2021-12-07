import { ApiStorage, useSelectorTyped } from "../../core";
import { ReducerApiState } from "../../core/redux/slices";

export function useSelectorApi<K extends keyof ReducerApiState>(
  key: K
): ReducerApiState[K] {
  const apiData = useSelectorTyped(
    (state) => ({
      ...state.api[key],
      response: ApiStorage.getResponse(state.api[key] as any),
    }),
    (l, r) => l?.version === r?.version && l?.isBusy === r?.isBusy
  );
  return apiData;
}
