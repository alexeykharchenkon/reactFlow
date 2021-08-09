import { ElementData } from "@models/dataTypes";
import { NodeType } from "@models/enumTypes";
import { values } from "./values";


const elementsArray: ElementData[] = [
    {
        className: "element start",  
        type: NodeType[NodeType.Start], 
        text: 'Start',
        maxInputs: values.Start.maxInputs,
        maxOutputs: values.Start.maxOutputs,
    },
    {
        className: "element end",  
        type: NodeType[NodeType.End], 
        text: 'End',
        maxInputs: values.End.maxInputs,
        maxOutputs: values.End.maxOutputs,
    },
    {
        className: "element phase",  
        type: NodeType[NodeType.Phase], 
        text: 'Phase',
        maxInputs: values.Phase.maxInputs,
        maxOutputs: values.Phase.maxOutputs,
    },
    {
        className: "element decision",  
        type: NodeType[NodeType.Decision], 
        text: 'Decision',
        maxInputs: values.Decision.maxInputs,
        maxOutputs: values.Decision.maxOutputs,
    },
    {
        className: "element subworkflow", 
        type: NodeType[NodeType.SubWorkFlow], 
        text: 'Sub Workflow',
        maxInputs: values.Subworkflow.maxInputs,
        maxOutputs: values.Subworkflow.maxOutputs,
    },
];

export const initData = { 
    elementsArray 
}
      