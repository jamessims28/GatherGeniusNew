
export function streamOperatingCoreTokens({
  text = "",
  readiness = {},
  onToken = () => {},
  onDone = () => {},
  onError = () => {},
  delayMs = 12
} = {}) {
  try {
    const tokens = String(text).split(/(\s+)/).filter(Boolean);
    let index = 0;

    function next() {
      if (index >= tokens.length) {
        onDone({
          ok: true,
          tokenCount: tokens.length,
          readiness
        });
        return;
      }

      const token = tokens[index];
      index += 1;
      onToken(token);

      setTimeout(next, delayMs);
    }

    next();

    return {
      ok: true,
      status: "streaming",
      tokenCount: tokens.length
    };
  } catch (error) {
    onError(error);
    return {
      ok: false,
      status: "failed",
      message: error.message
    };
  }
}

export function createLowLatencyTokenStream(options = {}) {
  return {
    stream(text, callbacks = {}) {
      return streamOperatingCoreTokens({ text, ...options, ...callbacks });
    }
  };
}

export default streamOperatingCoreTokens;
