export function safeSet(obj: any, key: string, value: any) {
  const segments = key.split('.');
  const last = segments.pop();
  segments.forEach((segment) => {
    if (!obj[segment]) {
      obj[segment] = {};
    }
    obj = obj[segment];
  });
  obj[last!] = value;

  return obj;
}
