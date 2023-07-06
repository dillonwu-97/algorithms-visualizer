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
    weight?: number;
}

/**
 * 
 * Information returned by the pathfinding algorithms 
 */
export type nodeMap = {
    vNodes: Node[]; // all visited nodes
    pNodes: Node[]; // nodes on the path
    count: number; 
}