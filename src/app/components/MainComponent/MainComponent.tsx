import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/rootStore';
import { DiagramComponent } from './DiagramComponent';
import { PropertiesComponent } from './PropertiesComponent';
import { ToolboxComponent } from './ToolboxComponent';

export const MainComponent = observer(() => {
    const { dataStore } = useStore();

    return(
        <div className="main">
            <ToolboxComponent operationsFunc={dataStore.operationsFunc}/>
            <DiagramComponent diagramaData={dataStore.diagramaData}/>
            <PropertiesComponent/>
        </div>
    );
});