import React from 'react';
import '@styles/main.css';
import '@styles/toolbox.css';
import '@styles/elements.css';
import '@styles/upMenu.css';
import '@styles/properties.css';
import 'beautiful-react-ui/beautiful-react-ui.css';
import { UpMenuComponent } from '@components/UpMenuComponent/UpMenuComponent';
import { MainComponent } from '@components/MainComponent/MainComponent';
import { useStore } from '@stores/rootStore';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
  const { dataStore } = useStore();
  return (
    <div className="app">
      <UpMenuComponent operationsFunc={dataStore.operationsFunc}/>
      <MainComponent 
        nodes={dataStore.nodes}
        edges={dataStore.edges}
        operationsFunc={dataStore.operationsFunc}
        activeNode={dataStore.activeNode}
      />
    </div>
  );
});
