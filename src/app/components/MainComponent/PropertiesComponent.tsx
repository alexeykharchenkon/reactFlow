import { ActionType } from '@models/enumTypes';
import { Button, Label } from 'beautiful-react-ui';
import React from 'react';

interface PropertiesComponentProps {
    activeNode: any;
    operationsFunc: any;
}

export const PropertiesComponent = ({activeNode, operationsFunc} : PropertiesComponentProps) => {

    return(
        <div className="properties">
            <h3>Properties</h3>
            <div>
                <Label>Label</Label>
                <input
                    className="properties_input"
                    name="label"
                    value={activeNode?.data?.label} 
                    onChange={(event) => operationsFunc(ActionType.ONCHANGEPROPERTIES, event) } />
            </div>
            <div className="button_save">
                <Button 
                    onClick={() => operationsFunc(ActionType.SAVEPROPERTIES, "")}
                >
                    Save Properties
                </Button>
            </div>
        </div>
    );
}