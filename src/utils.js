export default {

  getRoutePath(vueComponent) {
    return vueComponent.$route.path;
  },

  getMethodName() {
    let result = null;
    let str = this.getStack();
    if (str) {
      let strArr = str.split('\n');
      if (strArr && strArr.length >= 4) {
        let destLine = strArr[3];
        result = destLine.match(/\.(\w+)\s*\(/)[1];
      }
    } else {
      result = arguments.callee.caller;
    }
    return result;
  },

  getStack() {
    try {
      let stackTrace = {};
      Error.captureStackTrace(stackTrace, this.getStack);
      return stackTrace.stack;
    } catch (e) {
      return null;
    }
  },

  judgePage(vueComponent) {
    let depth = 0;
    while (true) {
      try {
        vueComponent = vueComponent.$parent;
      } catch (e) {
        break;
      }
      depth++;
    }
    return depth == 3;
  }

}
