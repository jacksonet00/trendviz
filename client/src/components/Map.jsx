import React from 'react';

const Map = ({ data }) => {


   return (
      <div>
         <h1>Map</h1>
         <pre>data: {JSON.stringify(data, 0, 3)}</pre>
      </div>
   );
};

export default Map;