

function getRecursiveMax(arr, index = 1, maxNumber = arr[0]) {
    if (index == arr.length) {
        return maxNumber;
    }

    if (arr[index] > maxNumber) {
        maxNumber = arr[index];
    }
    return getMax(arr, ++index, maxNumber); 
}


// console.log(getMax([1,2,9,19,8]))



export {getRecursiveMax}



