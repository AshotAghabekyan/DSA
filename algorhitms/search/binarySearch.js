



function binarySearch(arr, target, left = 0, right = arr.length -1) {
    if (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] == target) {
            return mid;
        }

        else if (arr[mid] > target) {
            return binarySearch(arr, target, left, mid - 1);
        }

        else {
            return binarySearch(arr, target, mid + 1, right);
        }
    }

    return -1;
}


// let arr = [11,22,33,44,55,66,77,88,99,100];
// console.log(binarySearch(arr, 44));


export {binarySearch}