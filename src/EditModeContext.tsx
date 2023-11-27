import { createContext, useContext } from 'react';

export const EditModeContext = createContext<Boolean>(false);

export function useResourceOrderContext() {
  const ChangeEditMode= useContext(EditModeContext);
  if (ChangeEditMode === undefined) {
    throw new Error('useResourceOrderContext must be used with a ResourceContext');
  }
  return ChangeEditMode;
}