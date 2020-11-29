import React from 'react';
import { codes } from '../data/states';

const Map = (props) => {
   const { data } = props;
   return (
      <div>
         {
            data === {} ? <div></div> :
               <div>
               <h1>Map</h1>
               {
                  codes.map((code) => {
                     return ( 
                        <div key={code} onClick={() => props.onSelectState(code)} style={{ cursor: 'pointer' }}>
                           <p>{code}: {data[code].length === 0 ? 'No Data' : `${data[code][0].name}`}</p>
                        </div>
                     )
                  })
               }
               </div>
         }
      </div>
   );
};

export default Map;
