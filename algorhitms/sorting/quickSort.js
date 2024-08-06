


function ranomElementIndex(from, to) {
    const randomInt = Math.floor(Math.random() * (to - from + 1) + from);
    return randomInt;
}


function medianOfThree(arr, start, end) {
    const midIndex = Math.floor((start + end) / 2);
    
    const a = arr[start];
    const b = arr[midIndex];
    const c = arr[end];
    
    if ((a <= b && b <= c) || (c <= b && b <= a)) {
        return midIndex; 
    } else if ((b <= a && a <= c) || (c <= a && a <= b)) {
        return start; 
    } else {
        return end;
    }
}




function partiton(arr, left, right) {
    let low = left;
    let high = right - 1;
    let medianIndex = medianOfThree(arr, left, right);
    [arr[medianIndex], arr[right]] = [arr[right], arr[medianIndex]];
    let pivot = arr[right];

    while (low <= high) {
        while (arr[low] < pivot) {
            ++low;
        }

        while (arr[high] > pivot) {
            --high;
        }

        if (low < high) {
            [arr[low], arr[high]] = [arr[high], arr[low]];
        }
    }

    [arr[low], arr[right]] = [arr[right], arr[low]];
    return low;
}


function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left <= right) {
        let pivot = partiton(arr, left, right);
        quickSort(arr, left, pivot -1);
        quickSort(arr, pivot + 1, right);
    }
}

// let arr = [1,6,4,5,2,3];
// quickSort(arr);
// console.log(arr);

// export { quickSort }




// function partition_prototype(arr, left, right) {
//     let low = left;
//     let high = right - 1;

//     let pivot = arr[right];

//     while (low <= right) {
//         while (arr[low] < pivot) {
//             ++low;
//         }

//         while (arr[high] > pivot) {
//             --high;
//         }

//         if (high > low) {
//             [arr[high], arr[low]] = [arr[low], arr[high]];
//         }
//     }

//     [arr[low], arr[right]] = [arr[right], arr[low]];
// }