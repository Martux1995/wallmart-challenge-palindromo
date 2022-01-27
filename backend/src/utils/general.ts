
/**
 * Check if a string is a palindrome
 * @param word The string to verify
 * @param removeSpaces Delete black spaces inside word. Default `false`.
 * @returns `true` if the word is a palindrome, `false` otherwise.
 */
export const isPalindrome = (word:string|number,removeSpaces:boolean=false) => {
    
    // Get word as a string, or convert if is a number
    const x = (typeof word === "number" ? word.toString() : word)
        .trim()
        .replace(' ',removeSpaces ? '' : ' ');

    // if the word has only one letter, the word is a palindrome
    if (x.length == 1) return true;

    // if the word has two or more letter, is needed to check each letter
    // to verify the palindrome
    for (let i = 0; i < x.length / 2; i++) {

        // Check the first letter with the last, from out to in.
        // if the letters are different, the word isn't a palindrome
        if (x[i] != x[x.length-(i + 1)])
            return false;
    }

    return true;
}