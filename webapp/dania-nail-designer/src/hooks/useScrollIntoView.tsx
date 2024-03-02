import { RefObject, useLayoutEffect } from 'react';


export function useScrollIntoView(ref: RefObject<HTMLElement>, dep: Array<unknown>) {
  useLayoutEffect(() => {
    
    setTimeout(() =>{
      ref.current?.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 250);

    setTimeout(() =>{
      document.getElementById('root')?.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      });
    }, 0);

  }, dep);
}