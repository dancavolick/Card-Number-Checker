// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


//Functions below:

//Function one - rearranges the original card number according to the Luhn algorithm and uses that to confirm if the card is valid (using a For loop)
let validateCred = (arr) => {
  let newArr = arr.reverse(); //reverses original arr
  for (let i = 1; i<arr.length; i+=2) { // loops through every second element in the array
    newArr[i] = newArr[i]*2; // multiplies that second value by 2 and replaces it with that new multiplied value, e.g. original value 1, would be replaced by 2
    if (newArr[i] > 9) {
      newArr[i] = newArr[i]-9; //if the new second value is greater than 9, 9 should be deducted from it, e.g. 10 would become 1
    }
  }
  const sumArr = newArr.reduce((a,b) => a + b, 0); //adds together all elements in the array and provides a sum total
  if (sumArr % 10 === 0) { //checks if the modulo 10 of the sum total is 0, i.e. does the sum total divide by 10 with no remainder - if so return true, otherwise return false
    return true;
  } else {
    return false;
  }
};

  //Function two - takes an array of card numbers and uses Function one to confirm whether they are invalid (using a .map method to return a new array of the invalid card numbers)
  let invalid = [];//new variable to hold the invalid card array

  let findInvalidCards = (nestedArr) => {
    nestedArr.map(index => {
      let check = validateCred(index); //runs the validateCred function against each sub array
        if (!check) {
          invalid.push(index); //if the validateCred function comes back as false, push that sub array to the invalid card array variable
        }
    })
    return invalid; //returns the complete invalid card array variable after the .map loop has finished running - if this is placed earlier in the function, it does not return the complete array!!
  };
 
//Function three - checks which companies have issued invalid card numbers (using a Switch)
function idInvalidCardCompanies(invalidBatch) {
  const companies = [];
  for (let i = 0; i < invalidBatch.length; i++) {
    switch (invalidBatch[i][0]) {
      case 3:
        if (companies.indexOf('Amex') === -1) {
          companies.push('Amex');
        }
        break
      case 4:
        if (companies.indexOf('Visa') === -1) {
          companies.push('Visa');
        }
        break
      case 5:
        if (companies.indexOf('Mastercard') === -1) {
          companies.push('Mastercard');
        }
        break
      case 6:
        if (companies.indexOf('Discover') === -1) {
          companies.push('Discover');
        }
        break
      default:
        console.log('Company not found');
    }
  }
  return companies;
}

// Test functions

//Function One
console.log(validateCred(invalid1)); //Rearranges the card number according to the Luhn algorithm and identifies invalid card numbers

//Function Two
console.log(findInvalidCards(batch)); // Tests which card numbers in the batch array are invalid

//Function Three
console.log(idInvalidCardCompanies(batch)); // Finds out which companies have mailed out invalid cards
