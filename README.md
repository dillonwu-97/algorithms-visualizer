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

# TODO:

## General  
1. Create a homepage for the visualizer -> a component that brings the user to the various parts of the website

## Pathfinder  
Todo:  
1. div grid is not centered when I zoom in or out; figure out how to center it
2. add weighted edges
3. add counter with the number of nodes visited
4. longest path algorithm
5. visualize the bad starts in wilson's loop erased random walk algorithm
6. fix the shift highlighting
7. disallow user to select walls as start or end nodes

## Sudoku
1. add n queens and k knights and rename page to games
2. integrate cover algorithm so that it can be visualized
3. bits algorithm
4. allow users to fill in various cells with value 

