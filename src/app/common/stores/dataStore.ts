import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { ActionType } from "@models/enumTypes";
import { ElementData } from "@models/dataTypes";
import { Elements } from "react-flow-renderer";

export class DataStore {

    diagramaData: Elements = [
        { 
            id: 'uuidv4()', 
            type: 'input',
            data: { label: 'Node 1' }, 
            position: { x: 50, y: 5 } 
        },
      ];
   
    constructor() { makeAutoObservable(this); }

    operationsFunc = (actionType: any, element: any) => {
        switch(actionType) {
            case ActionType.ADDNODE:
                this.addNode(element);
                break;
            case ActionType.DELETENODE:
               // this.deleteNode(element);
                break;
        }
        this.diagramaData = [...this.diagramaData];
    }

    addNode = (element: ElementData) => {
        this.diagramaData.push({
            id: uuidv4(),
            type: 'input',
            data: { label: `${element.text} ${this.diagramaData.length + 1}`, }, 
            position: { x: 100, y: 100 },
            //className: element.className.split(" ")?.map(c => "diagram_" + c).join(" "), 
        });    
    } 
}