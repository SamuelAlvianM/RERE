import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GameProvider>
      <AppRoutes />
      </GameProvider>
    </AuthProvider>
  );
};

export default App;
