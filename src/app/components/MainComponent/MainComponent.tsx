import React from 'react';
import { observer } from 'mobx-react-lite';
import { DiagramComponent } from './DiagramComponent';
import { PropertiesComponent } from './PropertiesComponent';
import { ToolboxComponent } from './ToolboxComponent';

interface MainComponentProps {
    nodes: any;
    edges: any;
    operationsFunc: any;
}

export const MainComponent = observer(({nodes, edges, operationsFunc} : MainComponentProps) => {

    return(
        <div className="main">
            <ToolboxComponent operationsFunc={operationsFunc}/>
            <DiagramComponent 
                nodes={nodes}
                edges={edges}
                operationsFunc={operationsFunc}
            />
            <PropertiesComponent/>
        </div>
    );
});