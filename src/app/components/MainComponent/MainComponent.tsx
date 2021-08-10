import React from 'react';
import { observer } from 'mobx-react-lite';
import { DiagramComponent } from './DiagramComponent';
import { PropertiesComponent } from './PropertiesComponent';
import { ToolboxComponent } from '../ToolboxComponent/ToolboxComponent';

interface MainComponentProps {
    nodes: any;
    edges: any;
    operationsFunc: any;
    activeNode: any;
}

export const MainComponent = observer(({nodes, edges, operationsFunc, activeNode} : MainComponentProps) => {

    return(
        <div className="main">
            <ToolboxComponent 
                nodes={nodes}
                operationsFunc={operationsFunc}
            />
            <DiagramComponent 
                nodes={nodes}
                edges={edges}
                operationsFunc={operationsFunc}
            />
            <PropertiesComponent
                activeNode={activeNode}
                operationsFunc={operationsFunc}
            />
        </div>
    );
});