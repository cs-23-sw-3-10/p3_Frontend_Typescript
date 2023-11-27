import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type EditModeContextType = {
  isEditMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const useEditModeContext = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditModeContext must be used within an EditModeProvider');
  }
  return context;
};

type EditModeProviderProps = {
  children: ReactNode;
};

export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
  const [isEditMode, setEditMode] = useState(false);

  const contextValue: EditModeContextType = {
    isEditMode,
    setEditMode,
  };

  return <EditModeContext.Provider value={contextValue}>{children}</EditModeContext.Provider>;
};
