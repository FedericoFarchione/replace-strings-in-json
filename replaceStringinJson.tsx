//this function is usefull to replace string or strings in a JSON file,
//make sure you can find the words in JSON file.
//the first parameter is the JSON you want replace.
//the second param is the array of words you actually have in JSON, if you have only one string to replace you have to pass in a array.
//the third param is the array of word you want to replace.
//if third.param.length < second.param.lenght the excedent words don be changed.

// IMPORTANT if in json u have a string like "lorem ipsum\rblablabla..." you have to insert
// in the array in this way ["lorem ipsum\\rblablabla...", "ecc..", "ecc.."]

const translateJSONstring = (
  source: any,
  arrayOfStringInJson: string[],
  arrayOfStringToReplace: any[],
) => {
  const stringifiedJSON = JSON.stringify(source);
  let jsonToWork: any = stringifiedJSON;

  for (let i = 0; i < arrayOfStringInJson.length; i++) {
    if (arrayOfStringToReplace[i] === undefined) {
      const regex = new RegExp(arrayOfStringInJson[i], 'gi');
      jsonToWork = jsonToWork.replace(regex, arrayOfStringInJson[i]);
    } else if (arrayOfStringInJson[i].includes('\\')) {
      const stringPosition = arrayOfStringInJson[i].indexOf('\\');
      const replaced =
        arrayOfStringInJson[i].slice(0, stringPosition) +
        '\\' +
        arrayOfStringInJson[i].slice(stringPosition);
      const regex = new RegExp(replaced, 'gi');
      jsonToWork = jsonToWork.replace(regex, arrayOfStringToReplace[i]);
    } else {
      const regex = new RegExp(arrayOfStringInJson[i], 'gi');
      jsonToWork = jsonToWork.replace(regex, arrayOfStringToReplace[i]);
    }
  }

  const finalResult = JSON.parse(jsonToWork);
  return finalResult;
};

export {translateJSONstring};
