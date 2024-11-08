/*
export type Nullable<T> = T | null;

export type Exact<T extends { [key: string]: unknown }> = {
  [k in keyof T]: T[k];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Nullable<T[SubKey]>;
};

export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Integer: { iput: number; output: number };
  Float: { iput: number; output: number };
  Datetime: { input: string; output: string };
};

export type Audit = {
  action: Scalars['String']['output'];
};
*/
