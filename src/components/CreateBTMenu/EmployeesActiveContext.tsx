import { createContext, useContext } from 'react';

export const ActiveEmployeesContext = createContext<Function | undefined>(undefined);

export function useActiveEmployeesContext() {
  const ChangeActiveEmployees = useContext(ActiveEmployeesContext);
  if (ChangeActiveEmployees  === undefined) {
    throw new Error('useResourceOrderContext must be used with a ResourceContext');
  }
  return ChangeActiveEmployees;
}