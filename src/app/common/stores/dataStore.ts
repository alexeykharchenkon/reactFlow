import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { ActionType, NodeType } from "@models/enumTypes";
import { ElementData } from "@models/dataTypes";
import { Edge, Node, isNode } from "react-flow-renderer";
import { xmlService } from "@services/XmlService";

export class DataStore {

    nodes: Node<any> [] = [
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
                parentId: "",
                children: [],
                onConnect: (element: any) => {this.operationsFunc(ActionType.CONNECTNODES, element)},
            }, 
            position: { x: 50, y: 5 },
            className: "diagram_element diagram_start", 
        },
      ];

    edges: Edge<any> [] = [];
   
    constructor() { makeAutoObservable(this) }

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
                element !== undefined && isNode(element) ? this.checkNode(element) :
                this.checkNode({id:""});
                break;
            case ActionType.LOADDIAGRAM:
                this.loadDiagram(element);
                break;
        }
        this.nodes = [...this.nodes];
        this.edges = [...this.edges];
    }

    loadDiagram = (element: any) => {
        this.nodes = xmlService.loadDiagramNodes(element);
        this.nodes.forEach(n => {
            n.data.onDelete = (id: string) => {this.operationsFunc(ActionType.DELETENODE, id)}
            n.data.onConnect = (element: any) => {this.operationsFunc(ActionType.CONNECTNODES, element)}
            n.data.onClick = (element: any) => {this.operationsFunc(ActionType.CHECKELEMENT, element)}

            //Subworkflow now is experimental
         /*   this.nodes.forEach(nn => {
                if(nn.data.parentId === n.id){
                    nn.position.x = 0;
                    nn.position.y = 50;
                    n.data.children.push(nn);
                    this.nodes = this.nodes.filter(x => x.id !== nn.id);
                }
            });*/
        });

        this.edges = xmlService.loadDiagramEdges(element);

        this.edges.forEach(e => {
            e.data.onDelete = (id: string) => {this.operationsFunc(ActionType.DELETEEDGE, id)}
        });

        this.setDataForSelect(); 
    }

    checkNode = (element: any) => {
        this.nodes.forEach(n => {
            if(n.id === element.id) n.className = n?.className + " checked";
            else { n.className = n?.className?.split("checked").join(" ") }
        });  

        if(element.id !== "" && element?.data?.parentId !== "") {
            this.nodes.forEach(n => {
               if(n.id === element.data.parentId){
                   n.data.children.forEach((c: any) => {
                       if(c.id === element.id) c.className = c?.className + " checked";
                       else { c.className = c?.className?.split("checked").join(" ") }
                   });  
               }   
           });
        }
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
        const id = uuidv4();
        var children: any = [];

        if(element.type === NodeType[NodeType.SubWorkFlow]) children = [this.makeFirstChildNode(id)];
            
        this.nodes.push(this.makeNode(element, id, "", children, 100, 100));
        this.setDataForSelect(); 
    }

    makeNode = (element: ElementData, id: string, parentId: string, children: any, posX: number, posY: number) : any => {
        var node = {
            id: id,
            type: element.type.toLowerCase(),
            data: {
                type: element.type,
                label: `${element.text} ${this.nodes.length + 1}`, 
                dataForSelect: [],
                maxInputs: element.maxInputs,
                maxOutputs: element.maxOutputs,
                isAFirstElement: false,
                children: children,
                parentId: parentId,
                onDelete: (id: string) => {this.operationsFunc(ActionType.DELETENODE, id)},
                onConnect: (element: any) => {this.operationsFunc(ActionType.CONNECTNODES, element)},
                onClick: (element: any) => {this.operationsFunc(ActionType.CHECKELEMENT, element)},
            }, 
            position: { x: posX, y: posY },
            className: element.className.split(" ")?.map(c => "diagram_" + c).join(" "), 
        }

          return node;
    }

    makeFirstChildNode = (parentId: string) : any => {
        var node = {
            id: uuidv4(),
            type: 'start',
            data: {
                type: NodeType[NodeType.Start],
                label: "Start", 
                dataForSelect: [],
                maxInputs: 0,
                maxOutputs: 1,
                isAFirstElement: true,
                parentId: parentId,
                onConnect: (element: any) => {this.operationsFunc(ActionType.CONNECTNODES, element)},
            }, 
            position: { x: 0, y: 50 },
            className: "diagram_element diagram_start", 
        }

          return node;
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