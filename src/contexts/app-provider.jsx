const { createContext, useState, useContext, useMemo } = require("react");

const AppContext = createContext();

export function AppProvider({ children }) {
  const [username, setUsername] = useState("");

  const value = useMemo(
    () => ({
      username,
      setUsername,
    }),
    [username, setUsername]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
