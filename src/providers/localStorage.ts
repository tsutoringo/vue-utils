import { InjectionKey, Ref, ref, watch } from "vue";

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

  return {
    get,
    store
  }
}

export type LocalStorageStore = ReturnType<typeof useLocalStorage>;
export const localStorageKey: InjectionKey<LocalStorageStore> = Symbol('localStorage');
