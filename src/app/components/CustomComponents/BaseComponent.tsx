import React, { memo } from 'react';
import { ButtonComponent } from './ButtonComponent';
import { HandleComponent } from './HandleComponent';

interface BaseComponentProps {
    id: string;
    data: any;
    isConnectable: any;
}

export const BaseComponent = memo(({ id, data, isConnectable } : BaseComponentProps) => {
 
  return (
    <>
     <div className="node_buttons">
        <ButtonComponent id={id} data={data} />
      </div>
      <div>
        {data.label}
      </div>
      <HandleComponent data={data} isConnectable={isConnectable} />
    </>
  );
});