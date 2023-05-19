import Big from 'big.js';

    /**
    * Format large number
    * @param value Number | large number > 10^10
    * @returns formatted number 
    */
    export const formatNumberDecimal = (value) => {
        const threshold = Big('1e10');
        const bigValue = Big(value);
        
        if (bigValue.gt(threshold)) {
            const shortenedValue = bigValue.toExponential(4);
            return shortenedValue;
        } 
        else {
            return bigValue.toString();
        }
      };