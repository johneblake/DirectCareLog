declare type apiType = {
  send: (channel: string, ...args: unknown[]) => void;
  receive: (channel: string, func: (...args: unknown[]) => void) => void;
};

export default apiType;
