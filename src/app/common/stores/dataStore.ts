import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { ActionType, NodeType } from "@models/enumTypes";
import { ElementData } from "@models/dataTypes";
import { Edge, Elements, isNode } from "react-flow-renderer";


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
            case ActionType.DELETEEDGE:
                this.deleteEdge(element);
                break;
            case ActionType.CONNECTNODES:
                this.connectNodes(element.from, element.to, element.label);
                break;
            case ActionType.CHECKELEMENT:
                if(element !== undefined && isNode(element)){
                    this.checkNode(element);
                }else{
                    this.checkNode({id:""});
                }
                break;
        }
        this.nodes = [...this.nodes];
        this.edges = [...this.edges];
    }

    checkNode = (element: any) => {
        this.nodes.forEach(n => {
            if(n.id === element.id) n.className = n?.className + " checked";
            else{ n.className = n?.className?.split("checked").join(" "); }
        });
    }

    connectNodes = (from: string, to: string, label: string) => {
        const nodeFrom  = this.nodes.find(n => n.id === from);
        const nodeTo  = this.nodes.find(n => n.id === to);

        const inputsCount = this.edges.filter(e => e.target === to).length;

        if(inputsCount < nodeTo?.data?.maxInputs){
            if(nodeFrom?.data?.type === NodeType[NodeType.Decision]){
                const edges = this.edges.filter(e => e.source === from);
                const firstEdge = edges?.find(e => e.source === from && e.sourceHandle === label);
                const secondEdge = edges?.find(e => e.source === from && e.target === to);
                
                this.edges = this.edges?.filter(e => e.id !== firstEdge?.id);
                this.edges = this.edges?.filter(e => e.id !== secondEdge?.id);

                this.edges?.push({
                    id: uuidv4(),
                    type: 'buttonedge',
                    source: from,
                    target: to,
                    sourceHandle: label,
                    label: label,
                    data: { 
                        onDelete: (id: string) => {this.operationsFunc(ActionType.DELETEEDGE, id)},
                    },
                });
            }else{
                this.edges = this.edges?.filter(e => e.source !== from);

                this.edges?.push({
                    id: uuidv4(),
                    type: 'buttonedge',
                    source: from,
                    target: to,
                    data: { 
                        onDelete: (id: string) => {this.operationsFunc(ActionType.DELETEEDGE, id)},
                    },
                });
            }
        }
    }

    deleteNode = (id: string) => {
        this.edges = this.edges?.filter(e => e.source !== id && e.target !== id);
        this.nodes = this.nodes.filter(n => n.id !== id);
        this.setDataForSelect();
    }

    deleteEdge = (id: string) => {
        this.edges = this.edges?.filter(e => e.id !== id);
    }

    addNode = (element: ElementData) => {
        var children: any = [];
        if(element.type === NodeType[NodeType.SubWorkFlow]){
            children = [
                {
                  id: "1",
                  type: 'start',
                  data: { 
                      label: 'Start', 
                      dataForSelect: [],
                      maxInputs: 0,
                      maxOutputs: 1,
                      isAFirstElement: true,
                    },
                  position: { x: 50, y: 0 },
                  className: "diagram_element diagram_start", 
                },
            ];
        }
            
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
                children: children,
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