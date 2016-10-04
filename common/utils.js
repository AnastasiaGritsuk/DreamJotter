function btoa(str) {
    if (!str || Buffer.byteLength(str) !== str.length)
        return 'bad string';
    
    return Buffer(str, 'binary').toString('base64');
}

module.exports = {
    btoa:btoa
}