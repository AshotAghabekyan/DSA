


function isAnagram(str1, str2) {

    let charSum1 = 0;
    let charSum2 = 0;

    for (let i = 0; i < str1.length; ++i) {
        charSum1 += str1.charCodeAt(i);
    }

    for (let i = 0; i < str2.length; ++i) {
        charSum2 += str2.charCodeAt(i);
    }

    return charSum1 == charSum2;
}


// console.log(isAnagram("hello", "lheol"))

export {isAnagram}