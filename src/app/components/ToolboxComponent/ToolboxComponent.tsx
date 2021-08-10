import React, { useState } from 'react';
import { Button, Select } from 'beautiful-react-ui';
import { initData } from '@common/data/initData';
import { ActionType, NodeType } from '@models/enumTypes';

interface ToolboxProps {
    operationsFunc: any;
    nodes: any;
}

export const ToolboxComponent = ({operationsFunc, nodes}: ToolboxProps) => {
    const [selected, setSelected] = useState<any>();
    const selectArray: any = [{value: "", label:"Main"}];

    nodes.forEach((n: any) => {
        if(n.data.type === NodeType[NodeType.SubWorkFlow]) 
            selectArray.push({value: n.id, label: n.data.label});
    });
  
    return(
        <div className="toolbox">
            <div className="toolboxButtons">  
                <h3>Add Node</h3>
                <div className="select_area_toolbox">
                    Add Node to
                    <Select
                        options={selectArray}  
                        onChange={(item: any) => setSelected(item)} 
                        value={selected} 
                        className={"select_toolbox"}
                        clearable={false}
                    />
                </div>
                {initData?.elementsArray?.map((el, index) => (
                    <Button 
                        key={index}
                        onClick={() => {operationsFunc(ActionType.ADDNODE, {element:el, parentId: selected ? selected : ""})}}
                        className={el.className}
                    >
                        {el.text}
                    </Button>
                ))}
            </div>
        </div>
    );
}