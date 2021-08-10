import { v4 as uuidv4 } from 'uuid';
import { NodeType } from '@models/enumTypes';
import { values } from '@common/data/values';
var DOMParser = require('xmldom').DOMParser;

class XmlService {
    loadDiagramEdges (xml: any) : any {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xml, "text/xml");
        var node1 = xmlDoc.getElementsByTagName("PilgrimVersion");
        var node2 = node1[0].getElementsByTagName("WorkflowDesigner");
        
        var result: any = [];

        result = result.concat(this.convertXML2Edges(node2, 'WorkflowLinkData'));

        return result;
    }

    loadDiagramNodes (xml: any) : any {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xml, "text/xml");
        var node1 = xmlDoc.getElementsByTagName("PilgrimVersion");
        var node2 = node1[0].getElementsByTagName("WorkflowDesigner");

        var result: any = [];

        result = result.concat(this.convertXML2Nodes(node2, 'TaskNodeData', NodeType[NodeType.Phase]));
        result = result.concat(this.convertXML2Nodes(node2, 'ActionPhaseNodeData', NodeType[NodeType.Phase]));
        result= result.concat(this.convertXML2Nodes(node2, 'OnDemandFormNodeData', NodeType[NodeType.Phase]));
        result= result.concat(this.convertXML2Nodes(node2, 'PhaseNodeData', NodeType[NodeType.Phase]));
        result= result.concat(this.convertXML2Nodes(node2, 'SystemTaskNodeData', NodeType[NodeType.Phase]));
        result= result.concat(this.convertXML2Nodes(node2, 'BlockingPhaseNodeData', NodeType[NodeType.Phase]));
        result= result.concat(this.convertXML2Nodes(node2, 'ApprovalPhaseNodeData', NodeType[NodeType.Phase]));
        result = result.concat(this.convertXML2Nodes(node2, 'ApprovalDecisionNodeData', NodeType[NodeType.Decision]));
        result = result.concat(this.convertXML2Nodes(node2, 'DecisionNodeData', NodeType[NodeType.Decision]));
        result= result.concat(this.convertXML2Nodes(node2, 'StartNodeData', NodeType[NodeType.Start]));
        result= result.concat(this.convertXML2Nodes(node2, 'EndNodeData', NodeType[NodeType.End]));
        //Subworkflow now is experimental
        result= result.concat(this.convertXML2Nodes(node2, 'SubWorkflowNodeData', NodeType[NodeType.SubWorkFlow]));
        result= result.concat(this.convertXML2Nodes(node2, 'SystemFormNodeData', NodeType[NodeType.SubWorkFlow]));
        result= result.concat(this.convertXML2Nodes(node2, 'InitializationPhase', NodeType[NodeType.SubWorkFlow]));
        result= result.concat(this.convertXML2Nodes(node2, 'SystemTaskContainerNodeData', NodeType[NodeType.SubWorkFlow]));

        return result;
    }

    convertXML2Nodes (xmlNode: any, tag: string, type: string) : any {
        var nodes = xmlNode[0].getElementsByTagName(tag);

        var resNodes = [];
        for(var n = 0; n < nodes.length; n++) {
            try{
                resNodes.push({
                    id: nodes[n].getAttribute('Key').toString(), // uuidv4(), 
                    type: type.toLowerCase(),
                    data: {
                        type: type,
                        label: nodes[n].getAttribute('Text').toString(),
                        dataForSelect: [],
                        maxInputs: this.calcMaxInputs(type),
                        maxOutputs: this.calcMaxOutputs(type),
                        isAFirstElement: false,
                        parentId: nodes[n].getAttribute('SubGraphKey').toString(),
                        children: [],
                        edges: [],
                    },
                    position: { 
                        x: nodes[n]?.getAttribute('Location').toString().split(" ")[0] * 1.3, 
                        y: nodes[n]?.getAttribute('Location').toString().split(" ")[1] * 1.3
                    },
                    className: "diagram_element diagram_" + type.toLowerCase(), 
                });
            } catch{}
       }    
    
      return resNodes;
    }

    convertXML2Edges (xmlNode: any, tag: string) : any {   
        var edges = xmlNode[0].getElementsByTagName(tag);

        var resEdges = [];
        for(var n = 0; n < edges.length; n++) {
            try{
                resEdges.push({
                    id: uuidv4(),
                    type: 'buttonedge',
                    source: edges[n].getAttribute('From').toString(),
                    target: edges[n].getAttribute('To').toString(),
                   // sourceHandle: label,
                    label: edges[n].getAttribute('Text').toString(),
                    data: { },
                });
            } catch{}
       }    
    
      return resEdges;
    }


    calcMaxInputs (type: string) : number {
        var res = 0;
    
        switch(type) {
            case NodeType[NodeType.Start]:
                res = values.Start.maxInputs;
                break;
            case NodeType[NodeType.Phase]:
                res = values.Phase.maxInputs;
                break;
            case NodeType[NodeType.Decision]:
                res = values.Decision.maxInputs;
                break;
            case NodeType[NodeType.SubWorkFlow]:
                res = values.Subworkflow.maxInputs;
                break;
            case NodeType[NodeType.End]:
                res = values.End.maxInputs;
                break;
        }
        return res;
    }

    calcMaxOutputs (type: string) : number {
        var res = 0;

        switch(type) {
            case NodeType[NodeType.Start]:
                res = values.Start.maxOutputs;
                break;
            case NodeType[NodeType.Phase]:
                res = values.Phase.maxOutputs;
                break;
            case NodeType[NodeType.Decision]:
                res = values.Decision.maxOutputs;
                break;
            case NodeType[NodeType.SubWorkFlow]:
                res = values.Subworkflow.maxOutputs;
                break;
            case NodeType[NodeType.End]:
                res = values.End.maxOutputs;
                break;
        }
        return res;
    }
}

export const xmlService = new XmlService();