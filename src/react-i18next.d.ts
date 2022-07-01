import { resources } from '@i18n';

declare global {
  type Translation = typeof resources['en']['translation'];
}

declare module 'react-i18next' {
  type ResourceType = typeof resources['en'];
  interface Resources extends ResourceType {}
}
