
/**
 * 217
 * Given an integer array nums, return true if any value appears at least
 * twice in the array, and return false if every element is distinct.
 * 
 * Example 1:
    Input: nums = [1,2,3,1]
    Output: true

   Example 2:
    Input: nums = [1,2,3,4]
    Output: false
 */

// function containsDuplicate(nums) {
//     let numSet = new Set(nums);
//     return nums.length != numSet.size;
// };

// let nums = [1,2,3,4,1]
// console.log(containsDuplicate(nums));



//------------------------------------------------------------------------------------



/**
 * 169. Majority Element
 * Given an array nums of size n, return the majority element.

The majority element is the element
that appears more than ⌊n / 2⌋ times.
You may assume that the majority element always exists in the array.

Example 1:
    Input: nums = [3,2,3]
    Output: 3

Example 2:
    Input: nums = [2,2,1,1,1,2,2]
    Output: 2
 */

// function majorityElement(nums) {
//     let obj = {};

//     for (let i = 0; i < nums.length; ++i) {
//         if (!obj[nums[i]]) {
//             obj[nums[i]] = 1;
//         } else {
//             ++obj[nums[i]]
//         }
//     }

//     let mid = Math.floor(nums.length / 2)
//     for (let j = 0; j < nums.length; ++j) {
//         if (obj[nums[j]] > mid) {
//             return nums[j];
//         }
//     }
//     return -1;
// };




//------------------------------------------------------------------------------------
/**
 * Given an array nums containing n distinct numbers in the range [0, n], 
 * return the only number in the range that is missing from the array.
 */

//variant 1  
// runtime complexity --> O((n * (log n) ** 2)
// space complexity --> O(1);
// var missingNumber = function(nums) {
//     nums.sort((a, b) => a - b);

//     let left = 0;
//     let right = nums.length - 1;
    
//     while (left <= right) {
//         let mid = Math.floor((left + right) / 2);

//         if (nums[mid] == mid) {
//             left = mid + 1;
//         } else {
//             right = mid - 1;
//         }
//     }

//     return left;
// };



//variant 2 
//runtime complexity --> O(n);
//space complexity --> O(n);
// var missingNumber = function(nums) {
//     let arr = [];

//     for (let i = 0; i <= nums.length; ++i) {
//         arr[nums[i]] = 1;
//     }

//     for (let j = 0; j <= arr.length; ++j) {
//         if (arr[j] != 1) {
//             return j;
//         }
//     }
//     return -1;
// };

// console.log(missingNumber([0,1,2,4,5,6,7]))







//------------------------------------------------------------------------------------

/**
 * 349. Intersection of Two Arrays
 * 
 * Given two integer arrays nums1 and nums2, return an array of their intersection.
    Each element in the result must be unique and you may return the result in any order.
 */

    // var intersection = function(nums1, nums2) {
    //     let result = {};
    //     for (let i = 0; i < nums2.length; ++i) {
    //         if (nums1.includes(nums2[i])) {
    //             result[nums2[i]] = nums2[i];
    //         }
    //     }
    //     return Object.values(result);
    // };


// let nums1 = [4,9,5];
// let nums2 = [9,4,9,8,4];

// console.log(intersection(nums1, nums2));




//------------------------------------------------------------------------------------
/**
 * 88. Merge Sorted Array
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
 * and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 * The final sorted array should not be returned by the function, but instead be stored inside the array nums1.
 * To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged,
 * and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
 */


// function merge(nums1, m, nums2, n) {
//     let start1 = 0;
//     let start2 = 0;
//     let result = [];

//     while (start1 < m && start2 < n) {
//         if (nums1[start1] < nums2[start2]) {
//             result.push(nums1[start1++])
//         } else {
//             result.push(nums2[start2++]);
//         }
//     }

//     while (start1 < m) {
//         result.push(nums1[start1++]);
//     }

//     while (start2 < n) {
//         result.push(nums2[start2++]);
//     }

//     for (let i = 0; i < nums1.length; ++i) {
//         nums1[i] = result[i];
//     }

//     return nums1
// }

// let arr = [1,2,3,0,0,0];
// let arr2 = [1,4,6];
// console.log(merge(arr, 3, arr2, 3));




//------------------------------------------------------------------------------------
/**
 * 1657. Determine if Two Strings Are Close
 * Two strings are considered close if you can attain one from the other using the following operations:

    Operation 1: Swap any two existing characters.
    For example, abcde -> aecdb
    Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
    For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
    You can use the operations on either string as many times as necessary.
    Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.
 */

// function closeStrings(word1, word2) {
//     if (word1.length != word2.length) {
//         return false;
//     }

//     const alphabetCount = 26;
//     let word1Arr = new Array(alphabetCount).fill(0);
//     let word2Arr = new Array(alphabetCount).fill(0);
//     const aCharCode = "a".charCodeAt(0)

//     for (let i = 0; i < alphabetCount; ++i) {
//         ++word1Arr[word1.charCodeAt(i) - aCharCode];
//         ++word2Arr[word2.charCodeAt(i) - aCharCode];
//     }

//     for (let i = 0; i < word1.length; ++i) {
//         if ((word1Arr[i] == 0 && word2Arr[i] != 0) || (word2Arr[i] == 0 && word1Arr[i] != 0)) {
//             return false;
//         }
//     }

//     word1Arr.sort((a, b) => a - b);
//     word2Arr.sort((a, b) => a - b);

//     for (let i = 0; i < alphabetCount; ++i) {
//         if (word1Arr[i] != word2Arr[i]) {
//             return false;
//         }
//     }
//     return true;
// };

// console.log(closeStrings("uau", "ssx"))



//------------------------------------------------------------------------------------
/**
 * 371. Sum of Two Integers
 * Given two integers a and b, return the sum of the two integers 
 * without using the operators + and -.
 */



// function getSum(a, b) {
//    while (b != 0) {
//       if (b > 0) {
//          --b;
//          ++a;
//       } else {
//          ++b;
//          --a;
//       }
 
//    }
//    return a;
// }

// console.log(getSum(2, 3));




//------------------------------------------------------------------------------------
/**
 * 121. Best Time to Buy and Sell Stock
 */


// function maxProfit(arr) {
//    let minPrice = arr[0];
//    let profit = 0;

//    for (let i = 0; i < arr.length; ++i) {
//       if (arr[i] < minPrice) {
//          minPrice = arr[i];
//       }

//       if (arr[i] - minPrice > profit) {
//          profit = arr[i] - minPrice;
//       }
//    }

//    return profit;
// }
// console.log(maxProfit([7,6,4,3,1]));



//------------------------------------------------------------------------------------
/**
 * 53. Maximum Subarray
 */
function maxSubArray(arr) {
   if (arr.length == 1) {
      return arr[0];
   }

   let isAllNegative = true;
   let sum = 0;
   let currentSum = 0;

   for (let i = 0; i < arr.length; ++i) {
      if (arr[i] > 0) {
         isAllNegative = false;
      }

      currentSum += arr[i];
      if (currentSum < 0) {
         currentSum = 0;
      } else if (currentSum > sum) {
         sum = currentSum;
      }
   }

   return isAllNegative ? Math.max(...arr) : sum
}