import { BaseComponent } from "@app/components/CustomComponents/BaseComponent";

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
  //  subworkflow: SubworkflowComponent,
  };

  export interface DataForSelect {
    label: string;
    value: string;
  }

 // export interface  Connect