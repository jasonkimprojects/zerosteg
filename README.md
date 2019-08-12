# ZeroSteg

A web-based steganography program to encode and 
decode a text message within another text message.
ZeroSteg takes advantage of the zero-width joiner and
zero-width non-joiner characters, which are part of Unicode.

When mixed into a string of letters, they are 'invisible' within
the string and the modified string is indistinguishable from the
original, due to the characters having literally zero width.
ZeroSteg treats the zero-width joiner as a bit of one, and the 
zero-width non-joiner as a bit of zero. 

ZeroSteg uses only client-side JavaScript to encode and decode
messages. Nothing is sent to me or processed on my end: your
secrets are safe. 

This repository hosts only the source files for ZeroSteg.
The website itself can be accessed through a link to my
personal website: https://jasonkimprojects.github.io/zerosteg/