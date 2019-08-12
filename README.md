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

ZeroSteg encodes messages by the following process. First, it
translates each character in the message to its binary
representation of its ASCII value. Second, it picks a series
of random indices to insert the zero-width characters into. I added
this step so that the zero-width characters would be randomly distributed inside
the text, so that the ciphertext would look less suspicious than if,
for example, the zero-width characters were all located at the beginning
or the end. Finally, it inserts a zero-width joiner/non-joiner sequentially,
depending on the binary value.

Decoding is the opposite of the operation above to a great extent. 
The ciphertext is scanned for zero-width joiners and non-joiners,
and they are grouped together in sequential order. Then, the
characters are translated and spliced into 8 bits each 
(since one character is one byte). Finally, the bytes are translated
back to ASCII characters, revealing the secret message.

ZeroSteg uses only client-side JavaScript to encode and decode
messages. Nothing is sent to me or processed on my end: your
secrets are safe. 

This repository hosts only the source files for ZeroSteg.
The website itself can be accessed through a link to my
personal website: https://jasonkimprojects.github.io/zerosteg/