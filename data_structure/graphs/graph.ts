import {Queue} from "../queue/queue.ts"
import {Stack} from "../stack/stack.ts"



class UndirectedGraph {
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


    private createMetricMap(startVertex: number = 0): number[] {
        const queue: number[] = [];
        const visited: boolean[] = []
        const metricMap: number[] = []
        let distance: number = 0;

        queue.push(startVertex);
        visited[startVertex] = true;
        metricMap[startVertex] = 0;

        while (queue.length > 0) {
            const vertex = queue.shift()!;
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


    public getShortestPath(v: number, u: number): number[] {
        if (!this.collection[v] || !this.collection[u]) {
            throw new Error("Invalid vertex");
        }

        const metricMap: number[] = this.createMetricMap(v);
        const result: number[] = [u];
        let currentVertex = u;

        while (currentVertex !== v) {
            for (const neighbor of this.collection[currentVertex]) {
                if (metricMap[neighbor] === metricMap[currentVertex] - 1) {
                    result.push(neighbor);
                    currentVertex = neighbor;
                    break;
                }
            }
        }

        return result.reverse();
    }

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
// console.log(graph.)
// graph.dfsTraverse();
// graph.removeEdges(2);
// console.log(graph.collection);
console.log(graph.getShortestPath(0, 5));
// graph.bfsTraverse();
// graph.dfsTraverse()