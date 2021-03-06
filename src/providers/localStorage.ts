import { WritableComputedRef, InjectionKey, Ref, ref, watch, computed } from 'vue';

export const useLocalStorage = () => {
  const store: {[key: string]: Ref<any>} = {} 

  const get = <T = string>(key: string, force: boolean = false): Ref<T> => {
    const value = localStorage.getItem(key);
    if (store[key]) {
      if (force) store[key].value = value;
      return store[key];
    }

    store[key] = ref(value);

    watch(store[key], (value) => {
      localStorage.setItem(key, value);
    });

    return store[key];
  }

  const getAsObject = <T extends {}>(key: string, inital: T, force?: boolean): WritableComputedRef<T> => {
    const value = get(key, force);
    if (!value.value) value.value = JSON.stringify(inital);
    return computed<T>({
      get () {
        return JSON.parse(value.value) as T;
      }, 
      set (val: T) {
        value.value = JSON.stringify(val);
      }
    });
  }

  const getAsBoolean = (key: string, inital: boolean, force?: boolean): WritableComputedRef<boolean> => {
    const value = get(key, force);
    if (!value.value) value.value = inital.toString();
    return computed<boolean>({
      get () {
        return value.value === 'true';
      },
      set (val: boolean) {
        value.value = val.toString();
      }
    });
  }

  return {
    get,
    store,
    getAsObject,
    getAsBoolean
  }
}

export type LocalStorageStore = ReturnType<typeof useLocalStorage>;
export const localStorageKey: InjectionKey<LocalStorageStore> = Symbol('localStorage');
