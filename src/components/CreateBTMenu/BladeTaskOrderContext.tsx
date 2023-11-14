import { createContext, useContext } from 'react';
import { BTOrder } from './BTMenuTypes';

export const BTOrderContext = createContext<BTOrder | undefined>(undefined);

export function useBTOrderContext() {
  const order = useContext(BTOrderContext);
  if (order === undefined) {
    throw new Error('useBTOrderContext must be used with a DashboardContext');
  }
  return order;
}