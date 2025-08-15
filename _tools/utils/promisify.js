function promisify(fn) {
    return (...args) => new Promise((resolve, reject) => {
        return fn(...args, (err, ...result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    })
}

module.exports = promisify;