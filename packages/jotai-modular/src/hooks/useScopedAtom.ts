import type { SetAtom, WritableAtom } from 'jotai/core/atom';
import { useContext } from 'react';
import { useAtom } from 'jotai';
import { ModuleContext } from '../context/ModuleContext';
import getModuleName from '../utils/getModuleName';

export default function useScopedAtom<T, U>(atom: WritableAtom<T, U>) {
  const scope = useContext(ModuleContext);
  const [value, setValue] = useAtom(atom, scope);

  if (typeof value === 'symbol' && scope && value.toString() !== scope.toString()) {
    throw new Error(`${atom.debugLabel} cannot be used in ${getModuleName(scope.toString())}`);
  }

  type R = Exclude<T, symbol>;
  type P = undefined extends R ? (update?: R | undefined) => R | Promise<R> : (update: R) => R | Promise<R>;
  return [value as R, setValue as unknown as SetAtom<P>] as const;
}
