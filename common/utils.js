function btoa(str) {
    if (Buffer.byteLength(str) !== str.length)
        throw new Error('bad string!');
    return Buffer(str, 'binary').toString('base64');
}

module.exports = {
    btoa:btoa

}