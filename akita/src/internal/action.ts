import { Action, __globalState } from './global-state';

export function applyAction<T>(func: () => T, action: Action, thisArg = undefined): T {
  __globalState.setCustomAction(action, true);
  return func.apply(thisArg);
}

export function action(action: Action, skipTransactionMsg = true) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
      __globalState.setCustomAction(action, skipTransactionMsg);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
