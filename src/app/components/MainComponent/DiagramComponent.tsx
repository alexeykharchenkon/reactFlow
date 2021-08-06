import { ActionType, NodeType } from '@models/enumTypes';
import { nodeTypes, edgeTypes } from '@models/dataTypes';
import React from 'react';
import { useState } from 'react';
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';

interface DiagramComponentProps {
    nodes: any;
    edges: any;
    operationsFunc: any;
}
export const DiagramComponent = ({nodes, edges, operationsFunc}: DiagramComponentProps) => {
    const [isDragable, setIsDragable] = useState<boolean>(true);

    const onElementClick = (event: any, element: any) => {
        operationsFunc(ActionType.CHECKELEMENT, element);
        setIsDragable(true);
        if(element?.data?.type === NodeType[NodeType.SubWorkFlow]) setIsDragable(false);
    }

    const onDiagramClick = () => {
        operationsFunc(ActionType.CHECKELEMENT, undefined);
        setIsDragable(true);
    }

    return(
        <div className="diagram">
            <ReactFlow
                elements={nodes.concat(edges)}
               // onLoad={onLoad}
               // onConnect={onConnect}
                onElementClick={(event, element) => onElementClick(event, element)}
                defaultZoom={1}
                minZoom={0.01}
                maxZoom={100}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodesDraggable={isDragable}
                onPaneClick={() => onDiagramClick()}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
}