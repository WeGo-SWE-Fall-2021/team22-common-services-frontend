function hash(salt, value) {
    let salted = sha256(salt);
    let hashed = sha256(salted + value);
    return hashed
}