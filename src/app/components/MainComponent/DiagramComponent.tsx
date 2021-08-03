import React from 'react';
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';

interface DiagramComponentProps {
    diagramaData: any;
}
export const DiagramComponent = ({diagramaData}: DiagramComponentProps) => {

    return(
        <div className="diagram">
            <ReactFlow
                elements={diagramaData}
                defaultZoom={1.5}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
}