import { createContext, useContext } from 'react';
import { BTOrderStateValues} from './BTMenuTypes';

export const BTOrderContext = createContext<BTOrderStateValues | undefined>(undefined);

export function useBTOrderContext() {
  const order = useContext(BTOrderContext);
  if (order === undefined) {
    throw new Error('useBTOrderContext must be used with a DashboardContext');
  }
  return order;
}