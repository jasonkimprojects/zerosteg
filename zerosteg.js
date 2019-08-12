// Copyright 2019 Jason Kim. All rights reserved.
/*
zerosteg.js

An encoder and decoder for messages WITHIN another text message,
using the zero-width joiner and non-joiner characters from Unicode.
*/

// TODO: Complete this function.
function encode() {
    var steg = document.getElementById('steg').value;
    var mask = document.getElementById('mask').value;
    console.log(steg)
    console.log(mask)
    var result = "Hello " + steg + "!<br>" + steg.length;
    document.getElementById('result').innerHTML = result;
    //console.log(rand_insert(100, 10));
    //console.log(convert_to_binary(user_input));
    //decode(user_input);
}

/*
Converts the given string to its ASCII code in binary.
*/
function convert_to_binary(str) {
    // Convert into char array.
    var chars = str.split('');
    var output = [];
    for (char in chars) {
        var binary = char.charCodeAt().toString(2);
        // Add zeros to make everything 8 bits.
        // Join adds array length - 1 zeros.
        output.push(Array(8 - binary.length + 1).join('0') + binary);
    }
    return output.join('');
}

/*
Returns an array of sorted indices of where to put the zero width
characters within the text. text_len is the length of the text to
hide the zero width chars within; steg_len is the length of the
hidden message.
*/
function rand_insert(text_len, steg_len) {
    var indices = [];
    while (steg_len > 0) {
        // While there is another index to insert,
        // generate random indices.
        var rand_idx = Math.floor(Math.random() * text_len);
        // If not duplicate, add to array.
        if (!indices.includes(rand_idx)) {
            indices.push(rand_idx);
            --steg_len;
        }
    }
    // Now that all indices are generated, sort the array
    // in ascending index order.
    indices.sort(function(x, y) {return x - y;});
    return indices;
}

// TODO: Complete this function.
function decode(str) {
    //console.log("ASDF");
    // Convert into char array.
    var chars = str.split('');
    var output = '';
    for (var i = 0; i < chars.length; ++i) {
        //console.log(chars[i]);
        if (chars[i] === '\u200d') {
            output += '1';
        }
        else if (chars[i] === '\u200c') {
            output += '0';
        }
    }
    console.log(output);
    console.log(parseInt(output, 2).toString(10));
    console.log(String.fromCharCode(65));
}
