import { nodeTypes } from '@models/dataTypes';
import React, { memo } from 'react';
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
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
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: "200px",
            height: "200px",
            overflow: "visible",
            fontSize: "15px",
            pointerEvents: "none"
          }}
        >
          
            <ReactFlowProvider>
              <ReactFlow
                maxZoom={0.1}
                defaultZoom={0.1}
                defaultPosition={[0, 0]}
                zoomOnScroll={false}
                elements={data.children}
                nodeTypes={nodeTypes}
              />
            </ReactFlowProvider>
          
        </div>
      </div>
      </div>
      <HandleComponent data={data} isConnectable={isConnectable} />
    </>
  );
});