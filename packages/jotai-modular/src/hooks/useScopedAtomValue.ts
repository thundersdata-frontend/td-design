import type { WritableAtom } from 'jotai/core/atom';
import { useContext } from 'react';
import { useAtomValue } from 'jotai/utils';
import { ModuleContext } from '../context/ModuleContext';
import getModuleName from '../utils/getModuleName';

export default function useScopedAtomValue<T, U>(atom: WritableAtom<T, U>) {
  const scope = useContext(ModuleContext);
  const value = useAtomValue(atom, scope);

  if (typeof value === 'symbol' && scope && value.toString() !== scope.toString()) {
    throw new Error(`${atom.toString()} cannot be used in ${getModuleName(scope.toString())}`);
  }
  return value;
}
