function calculateNeedlemanWunschAlgorithm(seq1, seq2) {
    const match = 1
    const miss = 1
    const gap = 2

    const l1 = seq1.length
    const l2 = seq2.length

    let m = []

    for(let i = 0; i <= l2; ++i) {
        let temp = []
        for(let j = 0; j <= l1; ++j) {
            if(i == 0) {
                temp.push(-gap * (j))
            } else if(j == 0) {
                temp.push(-gap * (i))
            } else {
                temp.push(0)
            }
        }
        m.push(temp)
    }

    const new1 = " " + seq1
    const new2 = " " + seq2

    for(let i = 0; i <= l2; ++i) {
        for(let j = 0; j <= l1; ++j) {
            if(!(i == 0 || j == 0)) {
                let score = 0
                let left_val = m[i][j-1] - gap
                let top_val = m[i-1][j] - gap
                let diag_val = m[i-1][j-1]

                if(new1[j] == new2[i]) {
                    diag_val += match
                } else {
                    diag_val -= miss
                }

                score = Math.max(left_val, top_val, diag_val)

                m[i][j] = score
            }
        }
    }

    return finalResult(m, seq1, seq2)
}

function finalResult(m, seq1, seq2) {
    const new1 = " " + seq1
    const new2 = " " + seq2
    const result = JSON.parse(JSON.stringify(m))

    for(let i = 0; i < result.length; ++i) {
        for(let j = 0; j < result[i].length; ++j) {
            result[i][j] = {
                "content": result[i][j],
                "color": false
            }
        }
    }

    let traverse = {x: result[0].length-1, 
        y: result.length-1
    }

    let geneResult = []
    while(traverse.x >= 0 && traverse.y >= 0) {
        result[traverse.y][traverse.x].color = true
        
        let newTraverse = null
        if(new1[traverse.x] == new2[traverse.y]) {
            newTraverse = {x: traverse.x -1, y: traverse.y - 1}
        } else {
            const left = {x: traverse.x -1, y: traverse.y}
            const up = {x: traverse.x, y: traverse.y-1}
            const diag = {x: traverse.x - 1, y: traverse.y-1}

            if(result[left.y][left.x].content > result[up.y][up.x].content) {
                if(result[left.y][left.x].content > result[diag.y][diag.x].content) {
                    newTraverse = left
                } else {
                    newTraverse = diag
                }
            } else {
                if(result[up.y][up.x].content > result[diag.y][diag.x].content) {
                    newTraverse = up
                } else {
                    newTraverse = diag
                }
            }
        }

        if(newTraverse.y === traverse.y-1 && newTraverse.x === traverse.x-1) {
            geneResult.push([new1[traverse.x], new2[traverse.y]+" "]) 
        } else {
            geneResult.push([new1[traverse.x], "_ "])
        }

        traverse = newTraverse
    }

    return [result, geneResult]
}

const fileInputs = document.querySelectorAll("input[type=file]");

fileInputs.forEach((elem, index) => {
	elem.addEventListener("change", (e) => {
		const textInput = document.getElementsByName(`dna-${index + 1}`)[0];

		const fileReader = new FileReader();
		fileReader.onload = () => {
			textInput.value = fileReader.result;
		};

		fileReader.readAsText(e.target.files[0]);
	});
});

const setButton = document.getElementsByTagName("button")[1];

setButton.addEventListener("click", () => {

	const tableDiv = document.getElementsByClassName("table-div")[0];

	tableDiv.innerHTML = "";

	const table = document.createElement("table");

	const textInputs = document.querySelectorAll("input[type=text]");

	const firstDNA = textInputs[0].value;
	const secondDNA = textInputs[1].value;

    // start timer
    var startTimer = performance.now()

    const [result, geneResult] = calculateNeedlemanWunschAlgorithm(firstDNA, secondDNA)

	for (let i = 0; i < secondDNA.length + 2; ++i) {
		const row = document.createElement("tr");
		for (let j = 0; j < firstDNA.length + 2; ++j) {
			const col = document.createElement("th");

			if (i == 0) {
				if (j > 1) {
					col.innerText = firstDNA[j - 2];
				}
			}

			if (j == 0) {
				if (i > 1) {
					col.innerText = secondDNA[i - 2];
				}
			}

            if(i != 0 && j != 0) {
                col.innerText = result[i-1][j-1].content;   
                if(result[i-1][j-1].color) {
                    col.setAttribute("style", "background-color: #dd4")
                }
            }

			row.appendChild(col);
		}

		table.appendChild(row);
	}

    // End Timer
    var endTimer = performance.now()

    const timeTaken = endTimer - startTimer

	tableDiv.appendChild(table);

    const resultDiv = document.getElementsByClassName("result-div")[0]

    // Clear previous result
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
    }

    const res = document.createElement("p")
    res.innerHTML += "RESULT"

    const paraf = document.createElement("p")
    for(let i = geneResult.length-1; i >=0; --i) {
        paraf.innerText += geneResult[i][0]
        paraf.innerText += " "
    }

    const paraf2 = document.createElement("p")
    for(let i = geneResult.length-1; i >=0; --i) {
        paraf2.innerText += geneResult[i][1]
    }

    const paraf3 = document.createElement("p")
    paraf3.innerText += "Time Taken: "

    const paraf4 = document.createElement("p")
    paraf4.innerText += timeTaken.toFixed(5)
    paraf4.innerText += " ms"

    resultDiv.appendChild(res)
    resultDiv.appendChild(paraf)
    resultDiv.appendChild(paraf2)
    resultDiv.appendChild(paraf3)
    resultDiv.appendChild(paraf4)

});