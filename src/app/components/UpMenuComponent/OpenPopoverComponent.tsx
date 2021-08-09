import React, { useState } from 'react';
import { Popover } from 'beautiful-react-ui';
import { ActionType } from '@models/enumTypes';


export const OpenPopoverComponent = (props: any) => {
  const { operationsFunc, trigger} = props;
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  const onChange = (e: any) => {
    if(e.target.files && e.target.files.length > 0){
       var reader = new FileReader();

       reader.onload = function(e) {
           var content = reader.result;
           operationsFunc(ActionType.LOADDIAGRAM, content);
       }

       reader.readAsText(e.target.files[0]);
    }
  }

  return (
    <Popover trigger={trigger} onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen}  placement="bottom-right">
        <div className="popover_Open">
            <input 
                type="file"
                onChange={(event: any) => onChange(event)}
            ></input>
        </div>
    </Popover>
  );
};
