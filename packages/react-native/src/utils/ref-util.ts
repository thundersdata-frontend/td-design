export function addNewRef<T>(refs: any[], newRef: T) {
  refs.push({
    current: newRef,
  });
}

export function removeOldRef<T>(refs: any[], oldRef: T | null) {
  refs = refs.filter(r => r.current !== oldRef);
}

export function getRef(refs: any[]) {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}
