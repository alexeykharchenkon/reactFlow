export enum ActionType {
    ADDNODE,
    DELETENODE,
    CONNECTNODES,
    DELETEEDGE,
    CHECKELEMENT,
    LOADDIAGRAM,
    DELETECHILDEDGE,
    ONCHANGEPROPERTIES,
    SAVEPROPERTIES
}

export enum NodeType {
    Start,
    End, 
    Phase,
    Decision,
    SubWorkFlow,
}