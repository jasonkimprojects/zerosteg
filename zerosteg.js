// Copyright 2019 Jason Kim. All rights reserved.
/*
zerosteg.js

An encoder and decoder for messages WITHIN another text message,
using the zero-width joiner and non-joiner characters from Unicode.

Jason Kim
August 12, 2019
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
        // Need to add i to keep track of # of inserts,
        // because the absolute index will shift as we insert
        // characters from the beginning of the string.
        idx = parseInt(insertion_arr[i]) + parseInt(i);
        console.log(idx);
        if (steg_binary[binary_idx] === '1') {
            // Insert zero-width joiner
            result = str_insert(result, '\u200d', idx);
        }
        else {
            // Insert zero-width non-joiner
            result = str_insert(result, '\u200c', idx);
        }
        ++binary_idx;
    }
    // Write to webpage.
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

/*
Decodes ZWJ and ZWNJ characters inside a string to reveal
the hidden message. Basically reverses the operation of encode().
*/
function decode() {
    var str = document.getElementById('ciphertext').value;
    // Convert into char array.
    var chars = str.split('');
    // Will hold bytes in binary after parsing.
    var bytes = [];
    var buffer = '';
    // Parse sequence of ZWJ/ZWNJ and reconstruct binary string.
    for (var i = 0; i < chars.length; ++i) {
        if (chars[i] === '\u200d') {
            buffer += '1';
        }
        else if (chars[i] === '\u200c') {
            buffer += '0';
        }
        // Push to bytes if a byte is complete.
        if (buffer.length === 8) {
            bytes.push(buffer);
            buffer = '';
        }
    }
    // Then convert each to decimal.
    for (var j = 0; j < bytes.length; ++j) {
        bytes[j] = parseInt(bytes[j], 2);
    }
    // Then convert decimal ASCII to char.
    for (var k = 0; k < bytes.length; ++k) {
        bytes[k] = String.fromCharCode(bytes[k]);
    }
    // Write to webpage.
    document.getElementById('result').innerHTML = bytes.join('');
}
