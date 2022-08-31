import React, { useReducer, useEffect, ReducerAction } from 'react';

interface RequestCase {
  pending: string;
  fulfilled: string;
  rejected: string;
  finally: string;
}

const requestCase: RequestCase = {
  pending: 'REQUEST_PENDING',
  fulfilled: 'REQUEST_FULFILLED',
  rejected: 'REQUEST_REJECTED',
  finally: 'REQUEST_FINAlLY',
};

interface RequestState {
  data: any;
  isLoading: boolean;
  error?: string | null;
}

interface Action {
  type: string;
  payload?: any | any[];
}

const initialState: RequestState = {
  data: [],
  isLoading: false,
  error: '',
};

const reducer = (state: RequestState, action: Action): RequestState => {
  switch (action.type) {
    case requestCase.pending:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case requestCase.fulfilled:
      return {
        ...state,
        isLoading: false,
        data: action.payload as any,
      };
    case requestCase.rejected:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };
    case requestCase.finally:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface Config {
  isManual?: boolean;
  deps?: [];
}

const useRequest = <T>(
  fn: (...params: any) => Promise<T | T[]>,
  config: Config = {}
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isManual = false, deps = [] } = config;

  const request = async (...params: any) => {
    try {
      dispatch({ type: requestCase.pending });
      const data = await fn(...params);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: requestCase.finally });
    }
  };

  useEffect(() => {
    if (!isManual) {
      request()
        .then((data) =>
          dispatch({ type: requestCase.fulfilled, payload: data as any })
        )
        .catch((error) =>
          dispatch({ type: requestCase.rejected, payload: error as string })
        );
    }
  }, deps);

  const result = isManual ? request : state.data;

  return { ...state, data: result };
};

export default useRequest;
