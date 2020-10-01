const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {

    let keyArr = Object.keys(MORSE_TABLE);
    let oldKey = Object.keys(MORSE_TABLE);

    keyArr = JSON.stringify(keyArr);   
    keyArr = keyArr.replace(/\"/g, '').replace(/\./g, '10').replace(/\-/g, '11').replace('[', '').replace(']', '');
    keyArr = keyArr.split(',');

    for (let i = 0; i < keyArr.length; i++) {
      if (keyArr[i].length < 10) {
        for (let el = keyArr[i].length; el < 10; el++) {
          keyArr[i] = '0' + keyArr[i];
        }
      }

      if (oldKey[i] !== keyArr[i]) {
          Object.defineProperty(MORSE_TABLE, keyArr[i],
              Object.getOwnPropertyDescriptor(MORSE_TABLE, oldKey[i]));
          delete MORSE_TABLE[oldKey[i]];
      }  

    }

  expr = expr.match(/.{1,10}/g);

  let result = '';

  for (let i = 0; i < expr.length; i++) {
    if (MORSE_TABLE.hasOwnProperty(expr[i])) {
      result += MORSE_TABLE[expr[i]];
    } else if (expr[i] === '**********') {
      result += ' ';
    }
  }

  return result;

}

module.exports = {
    decode
}
