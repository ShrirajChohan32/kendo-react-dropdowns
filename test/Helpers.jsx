function keyPress(shallowWrapper, key) {
    let charCode, keyCode;
    charCode = keyCode = String(key).charCodeAt(0);
    shallowWrapper.simulate("keyPress", { charCode: charCode, keyCode: keyCode, preventDefault: function() {} });
}

function lastCallArgs(spy) {
    return spy.calls.mostRecent().args[0];
}

export {
    keyPress,
    lastCallArgs
};
