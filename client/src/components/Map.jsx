import React from 'react';
import states from '../data/states';

const Map = (props) => {
   const { data } = props;
   console.log(data);
   return (
      <div>
         {
            data === {} ? <div></div> :
               <div>
               <h1>Map</h1>
               {
                  states.map((state, i) => {
                  return (
                     <p
                        style={{ cursor: 'pointer' }}
                        key={i} 
                        onClick={() => props.onSelectState(state.stateCode)}>
                           {state.stateCode}: {data[state.stateCode] ? data[state.stateCode][0].name : ''}
                     </p>
                  )
                  })
               }
               </div>
         }
      </div>
   );
};

export default Map;