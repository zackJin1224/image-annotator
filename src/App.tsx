import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';




function App() {
  
  const [imageUrl,setImageUrl] = useState<string | null>( null );

  return (
    <div className="h-screen flex flex-col">
      <Header onImageUpload={setImageUrl} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas imageUrl={imageUrl} />
      </div>
    </div>
  );
}

export default App;
