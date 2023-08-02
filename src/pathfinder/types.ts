export enum nodeType {
    START,
    END,
    WALL,
    UNVISITED,
    VISITED,
    BACKTRACK
}

export type Node = {
    row: number;
    col: number;
    type: nodeType;
    tdelay: number;
    weight?: number;
}

export type pathRet = {
    vNodes: Node[]; // all visited nodes
    bNodes: Node[]; // all nodes in backtrack
}