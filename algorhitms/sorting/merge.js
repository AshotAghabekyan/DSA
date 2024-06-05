


function merge(arr, start, mid, end) {
    let result = [];
    let left1 = start;
    let end1 = mid;
    let left2 = mid + 1;
    let end2 = end;
    let index = 0;

    while (left1 <= end1 && left2 <= end2) {
        if (arr[left1] <= arr[left2]) {
            result[index++] = arr[left1++];
        } else {
            result[index++] = arr[left2++];
        }
    }

    while (left1 <= end1) {
        result[index++] = arr[left1++];
    }

    while (left2 <= end2) {
        result[index++] = arr[left2++];
    }

    for (let i = start; i <= end; i++) {
        arr[i] = result[i - start];
    }
}

function mergeSort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        mergeSort(arr, start, mid);
        mergeSort(arr, mid + 1, end);
        merge(arr, start, mid, end);
    }
}

// let arr = [4, 35, 8, 9, 6, 3, 10, 67, 34, 1, 90, 5, 13, 52, 765, 17];
// mergeSort(arr);
// console.log(arr);




export { mergeSort };