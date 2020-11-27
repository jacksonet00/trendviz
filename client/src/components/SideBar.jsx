import React from 'react';

const SideBar = ({ data }) => {

   return (
      <div>
         <h1>SideBar</h1>
         <pre>data: {JSON.stringify(data, 0, 3)}</pre>
      </div>
   );
};

export default SideBar;