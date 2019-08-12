// Copyright 2019 Jason Kim. All rights reserved.
/*
zerosteg.js

An encoder and decoder for messages WITHIN another text message,
using the zero-width joiner and non-joiner characters from Unicode.
*/

/*
Encodes steg message as series of ZWJ and ZWNJ characters within mask.
ZWJ = binary 1, ZWNJ = binary 0.
*/
function encode() {
    // Pull values of steg and mask from html
    var steg = document.getElementById('steg').value;
    var mask = document.getElementById('mask').value;
    // Let result be a copy of the mask
    var result = mask;
    // Convert steg to binary.
    var steg_binary = convert_to_binary(steg);
    // Get insertion array.
    var insertion_arr = rand_insert(mask.length, steg.length);
    // Insert ZWJ and ZWNJ chars.
    var binary_idx = 0;
    for (i in insertion_arr) {
        idx = insertion_arr[i];
        if (steg_binary[binary_idx] === '1') {
            result = str_insert(result, '\u200d', idx);
        }
        else {
            result = str_insert(result, '\u200c', idx);
        }
        ++binary_idx;
    }
    document.getElementById('result').innerHTML = result;
}

/*
Helper function to insert chars in any index of a string.
*/
function str_insert(orig, insert, idx) {
    return [orig.slice(0, idx), insert, orig.slice(idx)].join('');
}

/*
Converts the given string to its ASCII code in binary.
*/
function convert_to_binary(str) {
    // Convert into char array.
    var chars = str.split('');
    var output = [];
    for (idx in chars) {
        var char = chars[idx];
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
    var num_steg_bits = steg_len * 8;
    while (num_steg_bits > 0) {
        // While there is another index to insert,
        // generate random indices.
        var rand_idx = Math.floor(Math.random() * text_len);
        indices.push(rand_idx);
        --num_steg_bits;
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
