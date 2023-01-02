function isObjectIdStringValid(objectId) {
    return new RegExp("^[0-9a-fA-F]{24}$").test(objectId);
}

function getKeysNotProvided(keys, object) {
    return keys.filter((key) => object[key] == undefined || object[key] === "");
}

module.exports = {
    isObjectIdStringValid: isObjectIdStringValid,
    getKeysNotProvided: getKeysNotProvided
}