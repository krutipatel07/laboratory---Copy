// function to format a timestamp, accepts the timestamp and an `options` object as parameters
  module.exports = (
    timestamp = {}
  ) => {
    // create month object
    const months = {
        Jan : 1,
        Feb : 2,
        Mar : 3,
        Apr : 4,
        May : 5,
        Jun : 6,
        Jul : 7,
        Aug : 8,
        Sep : 9,
        Oct : 10,
        Nov : 11,
        Dec : 12
    };
  
    const splitString = timestamp.split(' ')
    const mm = months[splitString[0]]
    const dd = splitString[1].replace(/st|nd|rd|th|,/gi, "")
    const yyyy = splitString[2]
  
    const formattedTimeStamp = `${mm}/${dd}/${yyyy}`;
    return formattedTimeStamp;
  };
  