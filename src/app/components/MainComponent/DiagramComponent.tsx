import { nodeTypes, edgeTypes } from '@models/dataTypes';
import React from 'react';
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';

interface DiagramComponentProps {
    nodes: any;
    edges: any;
}
export const DiagramComponent = ({nodes, edges}: DiagramComponentProps) => {
  //  const onLoad = (reactFlowInstance: any) => { reactFlowInstance.fitView()};
 //   const onConnect = useCallback((params: any) => {},[]);
 const onElementClick = (event: any, element: any) => {
     element.data.onChecked(element);
 }
    return(
        <div className="diagram">
            <ReactFlow
                elements={nodes.concat(edges)}
               // onLoad={onLoad}
               // onConnect={onConnect}
                onElementClick={(event, element) => onElementClick(event, element)}
                defaultZoom={1}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
}