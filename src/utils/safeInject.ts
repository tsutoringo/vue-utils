import { inject, InjectionKey } from 'vue';

export const safeInject = <T>(injectionKey: InjectionKey<T>): T => {
  const injected = inject(injectionKey);
  if (!injected) throw new Error(`Not provided with '${injectionKey.description}' injection key.`);
  return injected;
};
