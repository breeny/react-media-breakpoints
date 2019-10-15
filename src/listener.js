import breakpoints from "./breakpoints";

function listeners() {
  let queries = [];

  function createListeners(callback, query) {
    let _breakpoints = [];
    if (query) {
      _breakpoints = [
        {
          name: "",
          query
        }
      ];
    } else {
      _breakpoints = breakpoints.getBreakpoints();
    }

    if (global.window) {
      _breakpoints.forEach(breakpoint => {
        const mq = window.matchMedia(breakpoint.query);

        if (mq.matches) {
          callback(breakpoint);
        }

        const listener = mql => {
          if (mql.matches) {
            callback(breakpoint);
          }
        };

        mq.addListener(listener);

        queries.push({
          query: mq,
          listener
        });
      });
    } else {
      callback({
        name: "server"
      });
    }
  }

  function disposeListeners() {
    queries.forEach(bp => {
      bp.query.removeListener(bp.listener);
    });
  }

  return {
    disposeListeners,
    createListeners
  };
}

export default listeners;
