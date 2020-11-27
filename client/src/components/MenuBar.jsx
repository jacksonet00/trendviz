import React from 'react';

const MenuBar = ({ data }) => {

   return (
      <div>
         <h1>Menu Bar</h1>
         <pre>data: {JSON.stringify(data)}</pre>
      </div>
   );
};

export default MenuBar;