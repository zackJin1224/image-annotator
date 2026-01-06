/**
onChange: React.ChangeEvent<HTMLInputElement>
onClick: React.MouseEvent<HTMLButtonElement>
onSubmit: React.FormEvent<HTMLFormElement>
 */
import React from "react";

interface HeaderProps
{
  onImageUpload: ( url: string ) => void;
}

function Header ( { onImageUpload }: HeaderProps )
{
  const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const file = event.target.files?.[ 0 ];
    if ( file )
    {
      const reader = new FileReader();
      reader.onload = ( e ) =>
      {
        const url = e.target?.result as string;
        onImageUpload( url );
      };
      reader.readAsDataURL( file );
    }
  };

  
  return (
    <div className="bg-gray-800 text-white p-4 relative">
      <h1 className="text-2xl font-bold text-center">Image Annotator</h1>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="file-upload"
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Upload Image
        </label>
      </div>
    </div>
  );
}

export default Header;
