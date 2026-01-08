import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import AnnotationList from './components/AnnotationList';
import { Box } from './types';




function App() {
  
  const [ imageUrl, setImageUrl ] = useState<string | null>( null );
  //Lifting state up
  const [ annotations, setAnnotations ] = useState<Box[]>( [] );
  const handleDelete = ( index: number )=>{
    setAnnotations( annotations.filter( ( box, i ) => i !== index ) );
  };

  return (
    <div className="h-screen flex flex-col">
      <Header onImageUpload={setImageUrl} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas
          imageUrl={ imageUrl }
          annotations={ annotations }
          setAnnotations={setAnnotations}
        />
        <AnnotationList
          annotations={ annotations }
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
