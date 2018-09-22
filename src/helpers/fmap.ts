function fmap<T> (arr: T[], mapper: (ele: T) => T[]): T[] {
  return arr.reduce((acc: T[], ele: T) => {
    const result = mapper(ele);
    return [...acc, ...result];
  }, []);
}
  
export default fmap;