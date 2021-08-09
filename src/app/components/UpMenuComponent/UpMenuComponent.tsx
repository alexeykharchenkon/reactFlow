import { Button } from 'beautiful-react-ui';
import { OpenPopoverComponent } from './OpenPopoverComponent';

interface ToolboxProps {
    operationsFunc: any;
}

export const UpMenuComponent = ({operationsFunc}: ToolboxProps) => {


    return(
        <div className="upMenu">
             <OpenPopoverComponent 
                trigger={<Button className="load_Button">Load Diagram</Button>}
                operationsFunc={operationsFunc}
            />
        </div>
    );
}