import React, { memo } from 'react';
import { ButtonComponent } from './ButtonComponent';
import { HandleComponent } from './HandleComponent';

interface SubworkflowComponentProps {
    id: string;
    data: any;
    isConnectable: any;
}

export const SubworkflowComponent = memo(({ id, data, isConnectable } : SubworkflowComponentProps) => {
 
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