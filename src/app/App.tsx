import React from 'react';
import '@styles/main.css';
import '@styles/toolbox.css';
import '@styles/elements.css';
import 'beautiful-react-ui/beautiful-react-ui.css';
import { UpMenuComponent } from '@components/UpMenuComponent/UpMenuComponent';
import { MainComponent } from '@components/MainComponent/MainComponent';

export const App = () => {
  return (
    <div className="app">
      <UpMenuComponent/>
      <MainComponent/>
    </div>
  );
}
