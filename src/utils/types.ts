export type LanguageType = 'en-US' | 'nl-NL';
export type AppMode = 'dark' | 'light';

export interface CardComponentType {
  title: string;
  icon?: string | undefined;
  description?: string;
  inverseDark?: boolean;
  alwaysLight?: boolean;
}
