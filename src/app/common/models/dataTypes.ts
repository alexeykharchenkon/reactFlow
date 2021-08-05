import { CustomEdge } from "@components/CustomComponents/CustomEdge";
import { BaseComponent } from "@components/CustomComponents/BaseComponent";
import { SubworkflowComponent } from "@components/CustomComponents/SubworkflowComponent";

export interface ElementData {
    className: string;
    type: string;
    text: string;
    maxInputs: number;
    maxOutputs: number;
  }

 export const nodeTypes = {
    start: BaseComponent,
    end: BaseComponent,
    phase: BaseComponent,
    decision: BaseComponent,
    subworkflow: SubworkflowComponent,
  };

  export const edgeTypes = {
    buttonedge: CustomEdge,
  };

  export interface DataForSelect {
    label: string;
    value: string;
  }

 // export interface  Connect