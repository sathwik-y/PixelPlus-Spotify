
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Player from "./Player";

interface SpotifyLayoutProps {
  children: ReactNode;
  headerTitle?: string;
  transparentHeader?: boolean;
}

const SpotifyLayout = ({ 
  children, 
  headerTitle, 
  transparentHeader = false 
}: SpotifyLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header title={headerTitle} transparent={transparentHeader} />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default SpotifyLayout;
