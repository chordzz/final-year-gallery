'use client';

import { getDayImages, debugImagePaths } from "../../utils/gridLayouts";

export default function TestPage() {
  const days = ['corporate', 'denim', 'jersey', 'costume', 'owambe', 'others'];
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Image Path Test</h1>
      
      {days.map(dayId => {
        const images = getDayImages(dayId);
        debugImagePaths(dayId);
        
        return (
          <div key={dayId} className="mb-8 p-4 border rounded">
            <h2 className="text-xl font-semibold mb-4">{dayId.toUpperCase()} - {images.length} images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((imagePath, index) => (
                <div key={index} className="border p-2 rounded">
                  <p className="text-xs mb-2">{imagePath}</p>
                  <img 
                    src={imagePath} 
                    alt={`Test ${index}`}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      console.error(`Failed to load: ${imagePath}`);
                      e.currentTarget.style.backgroundColor = '#ffebee';
                      e.currentTarget.style.border = '2px solid #f44336';
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded: ${imagePath}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
