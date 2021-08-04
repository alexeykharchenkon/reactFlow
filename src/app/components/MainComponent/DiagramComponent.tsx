import { nodeTypes } from '@models/dataTypes';
import React from 'react';
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';

interface DiagramComponentProps {
    nodes: any;
    edges: any;
}
export const DiagramComponent = ({nodes, edges}: DiagramComponentProps) => {

    const onLoad = (reactFlowInstance: any) => { reactFlowInstance.fitView()};

    return(
        <div className="diagram">
            <ReactFlow
                elements={nodes.concat(edges)}
               // onLoad={onLoad}
                defaultZoom={1}
                nodeTypes={nodeTypes}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
}