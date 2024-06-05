

function bubbleSort(arr) {
    for (let i = 0; i < arr.length -1; ++i) {
        let isSorted = true;

        for (let j = 0; j < arr.length - 1 -i; ++j) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                isSorted = false;
            }
        }
        if (isSorted) {
            break;
        }
    }
    return arr;
}


function selectionSort(arr) {
    for (let i = 0; i < arr.length; ++i) {
        let min = arr[i];
        for (let j = i + 1; j < arr.length; ++j) {
            if (arr[j] < min) {
                min = arr[j];
            }
        }

        if (min != arr[i]) {
            [arr[i], min] = [min, arr[i]];
        }
    }
    return arr;
}



function insertionSort(arr) {
    for (let i = 1; i < arr.length; ++i) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
    return arr;
}



function countingSort(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    const countArr = new Array(max + 1).fill(0);
    for (let i = 0; i < max + 1; ++i) {
        ++countArr[arr[i]]
    }

    let arrIndex = 0;
    for (let i = 0; i < max + 1; ++i) {
        if (countArr[i] != 0) {
            for (let j = 0; j < countArr[i]; ++j) {
                arr[arrIndex++] = i; 
            }
        }
    }
    return arr;
}



// let arr = [56,13,68,87,1,4,6,987,12];
// bubbleSort(arr);
// console.log(arr);


export {insertionSort, bubbleSort, selectionSort, countingSort}