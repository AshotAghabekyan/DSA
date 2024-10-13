import { Queue } from "../queue/queue.ts";
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

            for (const neighbor of this.collection[vertex]) {
                if (!visitedList[neighbor]) {
                    visitedList[neighbor] = true;                    
                    queue.enqueue(neighbor);
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
    


    public createMetricMap(startVertex: number = 0): number[] {
        const queue: number[] = [];
        const visited: boolean[] = []
        const metricMap: number[] = []
        let distance: number = 0;

        queue.push(startVertex);
        visited[startVertex] = true;
        metricMap[startVertex] = distance;

        while (queue.length > 0) {
            const vertex: number = queue.shift();
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



    public getShortestPath(source: number, destination: number) {
        if (!this.collection[source] || !this.collection[destination]) {
            throw new Error("Invalid vertex");
        }

        let parents: number[] = [];
        let visited: boolean[] = [];
        let queue: number[] = [];

        parents[source] = null;
        visited[source] = true;
        queue.push(source);

        while (queue.length > 0) {
            let vertex = queue.shift();

            if (vertex == destination) {
                let result: number[] = [];
                result.push(vertex);

                while (vertex != source) {
                    let parent = parents[vertex];
                    result.push(parent);
                    vertex = parent;
                }
                return result.reverse();
            }

            for (const neighbor of this.collection[vertex]) {
                if (!visited[neighbor]) {
                    parents[neighbor] = vertex;
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }

        return [];
    }



    public allPossiblePaths(
        source: number,
        destination: number,
        visitedList: boolean[] = [],
        paths: number[] = [source],
        allPaths: number[][] = []
    ) {
        if (source == destination) {
            allPaths.push([...paths])
            return allPaths;
        }

        visitedList[source] = true;

        for (let neighbor of this.collection[source]) {
            if (!visitedList[neighbor]) {
                paths.push(neighbor);
                this.allPossiblePaths(neighbor, destination, visitedList, paths, allPaths);
                paths.pop();
            }
        }
        visitedList[source] = false;
        return allPaths
    }



    public getNthLevelVertices(targetLevel: number) {
        const queue: number[] = [];
        const visited: boolean[] = [];
        let result: number[] = []
        let startVertex = 0;
        queue.push(startVertex);
        visited[startVertex] = true;

        while (queue.length > 0) {
            let currentLevel = queue.length;

            for (let i = 0; i < currentLevel; ++i) {
                const vertex: number = queue.shift();
                
                for (let neighbor of this.collection[vertex]) {
                    if (!visited[neighbor]) {
                        queue.push(neighbor);
                        visited[neighbor] = true;
                    }
                }

                if (currentLevel == targetLevel) {
                    result.push(vertex);
                }
            }
            ++currentLevel;
        }
        return result;
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


// const graph: UndirectedGraph = new UndirectedGraph(10);

// graph.addVertex(0);
// graph.addVertex(1);
// graph.addVertex(2);
// graph.addVertex(3);
// graph.addVertex(4);
// graph.addVertex(5)

// graph.addEdge(0, 2);
// graph.addEdge(0, 4);
// graph.addEdge(2, 1);
// graph.addEdge(1, 3);
// graph.addEdge(3, 4);
// graph.addEdge(4, 5);
// graph.addEdge(3, 5);
// console.log(graph.getVerticiesOfLevel(3));
// console.log(graph.)
// graph.dfsTraverse();
// graph.removeEdges(2);
// console.log(graph.collection);
// console.log(graph.getShortestPath(1, 5));
// graph.bfsTraverse_recursive();
// graph.dfsTraverse_iterative()
// console.log(graph.getShortestPath(0, 3));
// console.log(graph.getNthLevelVertices(3));

// console.log(graph.allPossiblePaths(0, 3))





