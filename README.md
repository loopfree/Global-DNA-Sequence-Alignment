# Global DNA Sequence Alignment
> Global DNA Sequence Alignment using Needleman-Wunsch Algorithm

## How To Run
1. Download or Clone this repository
2. Open the `index.html` file on a <em><strong>Chromium Based</strong></em> Website

## What is Needleman-Wunsch Algorithm

### Definition
Needleman-Wunsch Algorithm is an algorithm which are used to align DNA, RNA, or protein sequences. This algorithm is used widely for solving the global alignment provlem. It has a worst-case performance and space complexity of `O(mn)`.

### How to Construct The Grid
The way that i choose to construct the grid is by making a matrix. This matrix has a size of m+2 times n+2.

<img align="left" width="150" height="150" src="./img/matrix-1.jpg">

For example we have the first sequence `ATGCT` and the second sequence `AGCT`. We will then create a matrix of first sequence length + 2 times second sequence length + 2. Then we will fill the matrix with the sequence. The matrix then will look like the image on the left.

<br>
<br>

<img align="left" width="150" height="150" src="./img/matrix-2.jpg">

After making the based structure, the next thing that i do is to fill the left and top border with a number which is its position times the gap value. In this case, the gap value that i choose is -2. Thus, the border value will be the multiple of -2. The matrix will then look the image on the left.

<br>
<br>

<img align="left" width="150" height="150" src="./img/matrix-3.jpg">

After filling the border. The next step is to fill the rest of the table. To fill the rest of the table, i use the Needleman-Wunsch scoring formula. Which look like this

<img width="30%" src="./img/scoring-formula.jpg/">

The s(xi,yi) value will be +1 (match) or -1 (mismatch)

<br>
<br>

<img align="left" width="150" height="150" src="./img/matrix-4.jpg">

After filling all of the border. The last step is to show the traceback by using coloring. To start the coloring, first we will start by coloring the bottom right corner of the matrix. Then check is it a match or mismatch. If that tile is a match, color the left diagonal. If its a mismatch, color the tile that has the higher score from the left, left diagonal, and up.

<br>
<br>

## Reference, Framework, and Library

Reference : <br>
https://www.youtube.com/watch?v=ipp-pNRIp4g

Framework & Library : <br>
None. Because vanilla could do.