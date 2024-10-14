


export class AdjacentMatrixGraph {
    private matrix: number[][]

    constructor(size: number) {
        this.matrix = []
    }

    public addEdge(vertex1: number, vertex2: number) {
        if (!this.matrix[vertex1]) {
            this.matrix[vertex1] = [];
        }

        if (!this.matrix[vertex2]) {
            this.matrix[vertex2] = [];
        }

        this.matrix[vertex1][vertex2] = 1;
        this.matrix[vertex2][vertex1] = 1; 
    }

    public bfs(startVertex: number = 0): void {
        const visited: boolean[] = [];
        const queue: number[] = [];
        queue.push(startVertex);
        visited[startVertex] = true;

        while (queue.length > 0) {
            const vertex = queue.shift(); 
            console.log(vertex);

            for (let i = 0; i < this.matrix[vertex].length; ++i) {
                if (this.matrix[vertex][i] === 1 && !visited[i]) {
                    queue.push(i);
                    visited[i] = true;
                }
            }
        }
    }


}


const graph: AdjacentMatrixGraph = new AdjacentMatrixGraph(10);
graph.addEdge(0, 2);
graph.addEdge(0, 4);
graph.addEdge(2, 1);
graph.addEdge(1, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(3, 5);
graph.bfs();