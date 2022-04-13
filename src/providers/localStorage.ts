import { InjectionKey, Ref, ref, watch } from "vue";

export const useLocalStorage = () => {
  const store: {[key: string]: Ref<any>} = {} 

  const get = <T = string>(key: string): Ref<T> => {
    if (store[key]) return store[key];
    const value = localStorage.getItem(key);
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
