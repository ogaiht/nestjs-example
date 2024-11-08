export type Constructor<T> = new () => T;
export type Func<TInput, TOutput> = (item: TInput) => TOutput;
export type Action = () => void;
