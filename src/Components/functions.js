    /**
    * Format large number
    * @param value Number | large number > 10^10
    * @returns formatted number 
    */
    export const formatNumberDecimal = (value) => {
        if(value > Math.pow(10,10)){
          const shortenedValue = parseFloat(value).toExponential(4);
          return shortenedValue;
          }
        else
          return value;
        };



        