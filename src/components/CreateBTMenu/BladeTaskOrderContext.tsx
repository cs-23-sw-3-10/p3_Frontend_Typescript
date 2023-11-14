import { createContext, useContext } from 'react';
import { ResourceOrder } from './BTMenuTypes';

export const ResourceOrderContext = createContext<Function | undefined>(undefined);

export function useResourceOrderContext() {
  const ChangeResourceOrder= useContext(ResourceOrderContext);
  if (ChangeResourceOrder === undefined) {
    throw new Error('useResourceOrderContext must be used with a ResourceContext');
  }
  return ChangeResourceOrder;
}