# Algorithms Visualizer  

This is a website project that allows the user to visualize a motley of various algorithms.  
The website can be found here: https://dillonwu-97.github.io/algorithms-visualizer

## Features:
### Pathfinding Visualizer
* Finds the shortest path between two cells in the grid
* Algorithms implemented: A*, Greedy, BFS, DFS, Dijkstra
### Maze Generator
* Creates a random procedurally generated maze
* Algorithms implemented: Prim's MST, Kruskal's MST, Wilson (loop-erased random walk), Custom randomized iterator
### Sudoku Solver
* Creates a random sudoku configuration and solves it
* Algorithms implemented: Bruteforce backtracking, Deductive backtracking
### Sorting Visualizer
* Visualize sorting
* Algorithms implemented: Bubble, Insertion, Selection, Merge, Heap

## TODO:

### General  
1. Create a title for the website
2. Create test cases to ensure correctness for the algorithms
3. Improve commenting and code optimization

### Pathfinder  
Todo:  
1. fix bug where a previously clicked on cell becomes untraversable because the program thinks it is a wall(bug is probably async, await issue)
2. add weighted edges
3. add counter with the number of nodes visited
4. longest path algorithm
6. fix the shift highlighting
7. disallow user to select walls as start or end nodes

### Sudoku
1. add n queens and k knights and rename page to games
2. integrate cover algorithm so that it can be visualized
3. bits algorithm

