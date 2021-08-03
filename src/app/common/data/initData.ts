import { ElementData } from "@models/dataTypes";
import { NodeType } from "@models/enumTypes";


const elementsArray: ElementData[] = [
    {
        className: "element start",  
        type: NodeType[NodeType.Start], 
        text: 'Start',
        maxInputs: 0,
        maxOutputs: 1,
    },
    {
        className: "element end",  
        type: NodeType[NodeType.End], 
        text: 'End',
        maxInputs: 10,
        maxOutputs: 0,
    },
    {
        className: "element phase",  
        type: NodeType[NodeType.Phase], 
        text: 'Phase',
        maxInputs: 5,
        maxOutputs: 1,
    },
    {
        className: "element decision",  
        type: NodeType[NodeType.Decision], 
        text: 'Decision',
        maxInputs: 1,
        maxOutputs: 2,
    },
    {
        className: "element subworkflow", 
        type: NodeType[NodeType.SubWorkFlow], 
        text: 'Sub Workflow',
        maxInputs: 1,
        maxOutputs: 1,
    },
];

export const initData = { 
    elementsArray 
}
      