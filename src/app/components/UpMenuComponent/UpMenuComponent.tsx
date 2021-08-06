import { ActionType } from '@models/enumTypes';
import { Button } from 'beautiful-react-ui';
import React from 'react';

interface ToolboxProps {
    operationsFunc: any;
}

export const UpMenuComponent = ({operationsFunc}: ToolboxProps) => {

    return(
        <div className="upMenu">
            <Button 
                onClick={() => { operationsFunc(ActionType.LOADDIAGRAM, "")}}
            >
                Load Diagram
            </Button>
        </div>
    );
}