import {Queue} from "../queue/queue.ts"
import { Stack } from "../stack/stack.ts";



export class UndirectedGraph {
    public collection: number[][];

    constructor(size: number) {
        this.collection = new Array(size)
    }

    public addVertex(value: number) {
        this.collection[value] = [];
    }


    public addEdge(u: number, v: number) {
        this.collection[u].push(v);
        this.collection[v].push(u);
    }


    public dfsTraverse(v: number = 0, visitList: boolean[] = []) {
        visitList[v] = true;
        console.log(v);

        for (let i = 0; i < this.collection[v].length; ++i) {
            if (!visitList[this.collection[v][i]]) {
                this.dfsTraverse(this.collection[v][i], visitList);
            }
        }
    }


    public dfsTraverse_iterative() {
        const stack: Stack<number> = new Stack(this.collection.length);
        const visitedList: boolean[] = [];
        const startVertex: number = 0;
        stack.push(startVertex);
        visitedList[startVertex] = true;

        
        while (!stack.isEmpty()) {
            const vertex: number = stack.getTop();
            stack.pop();
            console.log(vertex);

            for (let neighbor of this.collection[vertex]) {
                if (!visitedList[neighbor]) {
                    visitedList[neighbor] = true;
                    stack.push(neighbor);                    
                }
            }
        }
    }


    public bfsTraverse(v: number = 0): void {
        const queue: Queue<number> = new Queue<number>(this.collection.length);
        const visitedList: boolean[] = [];
        queue.enqueue(v);
        visitedList[v] = true;

        while (!queue.isEmpty()) {
            const vertex: number = queue.peek();
            queue.dequeue();

            for (let i = 0; i < this.collection[vertex].length; ++i) {
                if (!visitedList[this.collection[vertex][i]]) {
                    visitedList[this.collection[vertex][i]] = true;                    
                    queue.enqueue(this.collection[vertex][i]);
                }
            }
            console.log("vertex-->", vertex);
        }
    }


    public bfsTraverse_recursive(startVertex: number = 0, visitedList: boolean[] = [], queue: number[] = [startVertex]) {
        if (queue.length === 0) {
            return; 
        }
    
        const vertex = queue.shift()!; 
        visitedList[vertex] = true; 
        console.log(vertex); 
    
        for (let neighbor of this.collection[vertex]) {
            if (!visitedList[neighbor]) {
                visitedList[neighbor] = true; 
                queue.push(neighbor); 
            }
        }
    
        this.bfsTraverse_recursive(startVertex, visitedList, queue);
    }
    


    private createMetricMap(startVertex: number = 0): number[] {
        const queue: number[] = [];
        const visited: boolean[] = []
        const metricMap: number[] = []
        let distance: number = 0;

        queue.push(startVertex);
        visited[startVertex] = true;
        metricMap[startVertex] = distance;

        while (queue.length > 0) {
            const vertex: number = queue.shift()!;
            distance = metricMap[vertex];

            for (const neighbor of this.collection[vertex]) {
                if (!visited[neighbor]) {
                    queue.push(neighbor);
                    visited[neighbor] = true;
                    metricMap[neighbor] = distance + 1;  
                }
            }
        }
        return metricMap;
    }


    public getVerticiesOfLevel(nLevel: number, startVertex: number = 0) {
        if (nLevel < 1) {
            throw new Error('invalid level');
        }

        const queue: Queue<number> = new Queue<number>(this.collection.length);
        let visitedList: boolean[] = [];
        let level: number = 1;
        let levelVerticies: number[] = [];

        queue.enqueue(startVertex);
        visitedList[startVertex] = true; 

        while (!queue.isEmpty()) {
            const levelCount: number = queue.length();
    
            for (let i = 0; i < levelCount; ++i) {
                const vertex = queue.peek();
                queue.dequeue();

                if (level == nLevel) {
                    levelVerticies.push(vertex);
                    continue;
                }
    
                for (const adjacentVertex of this.collection[vertex]) {
                    if (!visitedList[adjacentVertex]) {
                        visitedList[adjacentVertex] = true;
                        queue.enqueue(adjacentVertex);
                    }
                }
            }

            if (level == nLevel) {
                return levelVerticies;
            } 
            ++level;
        }
        return levelVerticies;
    }
    




    public getShortestPath(v: number, u: number): number[] {
        if (!this.collection[v] || !this.collection[u]) {
            throw new Error("Invalid vertex");
        }

        const metricMap: number[] = this.createMetricMap(v);
        const path: number[] = [];
        path.push(u);
        let currentVertex = u;

        while (currentVertex !== v) {
            for (const neighbor of this.collection[currentVertex]) {
                if (metricMap[neighbor] === metricMap[currentVertex] - 1) {
                    path.push(neighbor);
                    currentVertex = neighbor;
                    break;
                }
            }
        }

        return path.reverse();
    }


    // public getAllPaths(source: number, destination: number): number[][] {
    //     const stack: Stack<number> = new Stack(this.collection.length);
    //     const inStack: boolean[] = [];
    //     const startVertex: number = 0;
    //     stack.push(startVertex);
    //     inStack[startVertex] = true;

        
    //     while (!stack.isEmpty()) {
    //         let curr = [];
    //         const vertex: number = stack.getTop();
    //         stack.pop();
    //         curr.push(vertex);
    //         console.log(vertex);

    //         for (let neighbor of this.collection[vertex]) {
    //             if (!visitedList[neighbor]) {
    //                 visitedList[neighbor] = true;
    //                 stack.push(neighbor);   
    //             }

    //             if (destination == neighbor) {

    //             }
    //         }
    //     }

    //     return null;
    // }


    public removeEdges(v: number) {
        if (!this.collection[v]) {
            return null;
        }

        for (let i = 0; i < this.collection[v].length; ++i) {
            const index: number = this.collection[this.collection[v][i]].findIndex(
                (vertex: number) => vertex === v
            );
            this.collection[this.collection[v][i]].splice(index, 1);
        }
        this.collection[v] = [];
    }
}


const graph: UndirectedGraph = new UndirectedGraph(10);

graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5)

graph.addEdge(0, 2);
graph.addEdge(0, 4);
graph.addEdge(2, 1);
graph.addEdge(1, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(3, 5);
// console.log(graph.getVerticiesOfLevel(3));
// console.log(graph.)
// graph.dfsTraverse();
// graph.removeEdges(2);
// console.log(graph.collection);
// console.log(graph.getShortestPath(1, 5));
graph.bfsTraverse_recursive();
// graph.dfsTraverse_iterative()


