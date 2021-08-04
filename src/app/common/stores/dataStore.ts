import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { ActionType, NodeType } from "@models/enumTypes";
import { ElementData } from "@models/dataTypes";
import { Edge, Elements } from "react-flow-renderer";


export class DataStore {

    nodes: Elements = [
        { 
            id: uuidv4(), 
            type: 'start',
            data: { 
                type: NodeType[NodeType.Start],
                label: 'Start',  
                dataForSelect: [],
                maxInputs: 0,
                maxOutputs: 1,
                isAFirstElement: true,
                inputs: [],
                outputs: [{id: uuidv4()}],
                onDelete: (id: string) => {this.operationsFunc(ActionType.DELETENODE, id)},
                onConnect: (element: any) => {this.operationsFunc(ActionType.CONNECTNODES, element)},
            }, 
            position: { x: 50, y: 5 },
            className: "diagram_element diagram_start", 
        },
      ];

    edges: Edge<any> [] = [];
   
    constructor() { makeAutoObservable(this); }

    operationsFunc = (actionType: any, element: any) => {
        switch(actionType) {
            case ActionType.ADDNODE:
                this.addNode(element);
                break;
            case ActionType.DELETENODE:
                this.deleteNode(element);
                break;
            case ActionType.CONNECTNODES:
                this.connectNodes(element.from, element.to, element.label);
                break;
        }
        this.nodes = [...this.nodes];
        this.edges = [...this.edges];
    }

    connectNodes = (from: string, to: string, label: string) => {
        const nodeFrom  = this.nodes.find(n => n.id === from);
        const nodeTo  = this.nodes.find(n => n.id === to);

        if(nodeFrom?.data?.type === NodeType[NodeType.Decision]){
            this.edges = this.edges?.filter(e => e.sourceHandle !== e.id + label.toLowerCase());

            const id = uuidv4(); 
            this.edges?.push({
                id: id,
                type: 'straight',
                source: from,
                target: to,
                sourceHandle: label.toLowerCase(),
                label: label,
            });
        }else{
            this.edges = this.edges?.filter(e => e.source !== from);

            this.edges?.push({
                id: uuidv4(),
                type: 'straight',
                source: from,
                target: to,
            });
        }
    }

 /*   addLink = (outputsFrom: Port[], inputsTo: Port[], i: number, label: string, maxOutputs: number, maxInputs: number) => {
        //this.edges = this.edges?.filter(l => l.input !== outputsFrom[i].id);

        const linksOut = this.edges?.filter(l => l.input  === outputsFrom[i].id);
        const linksIn = this.edges?.filter(l => l.output  === inputsTo[0].id);

        if(linksOut?.length as number < maxOutputs && linksIn?.length as number < maxInputs) 
            this.edges?.push({  });
    }*/

    deleteNode = (id: string) => {
      //  const node = this.nodes.find(n => n.id === id);

      //  node?.inputs?.forEach(i => {this.schema.links = this.schema.links?.filter(l => l.output !== i.id);});
     //   node?.outputs?.forEach(o => {this.schema.links = this.schema.links?.filter(l => l.input !== o.id);});

        this.nodes = this.nodes.filter(n => n.id !== id);

       // this.setDataForSelect();
    }

    addNode = (element: ElementData) => {
        const inputs = [];
        const outputs = [];

        if(element.type !== NodeType[NodeType.Start]) inputs.push({id: uuidv4()});
        if(element.type !== NodeType[NodeType.End]) outputs.push({id: uuidv4()});
        if(element.type === NodeType[NodeType.Decision]) outputs.push({id: uuidv4()});

        this.nodes.push({
            id: uuidv4(),
            type: element.type.toLowerCase(),
            data: {
                type: element.type,
                label: `${element.text} ${this.nodes.length + 1}`, 
                dataForSelect: [],
                maxInputs: element.maxInputs,
                maxOutputs: element.maxOutputs,
                isAFirstElement: false,
                inputs: inputs,
                outputs: outputs,
                onDelete: (id: string) => {this.operationsFunc(ActionType.DELETENODE, id)},
                onConnect: (element: any) => {this.operationsFunc(ActionType.CONNECTNODES, element)},
            }, 
            position: { x: 100, y: 100 },
            className: element.className.split(" ")?.map(c => "diagram_" + c).join(" "), 
        });    

        this.setDataForSelect();
    } 

    setDataForSelect = () => {
        this.nodes.forEach(node => {
            if(node.data.type !== NodeType[NodeType.End]) {
                node.data?.dataForSelect?.splice(0);
                this.nodes.forEach(n => {
                    if(n.id !== node.id && n.data.type !== NodeType[NodeType.Start])
                        node.data?.dataForSelect?.push({
                            label: n.data.label?.toString() as string, 
                            value: n.id
                        });
                });
            }
        });
    }
}