import classNames from "classnames";
import { useEffect, useState } from "react";


interface Props {
    total: number;
}
export function FloatingTotal({total}: Props) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const onScroll = function() {
            setShow(window.scrollY <= 120);
        }
        
        
        document.addEventListener('scroll', onScroll);

        return () => {
            document.removeEventListener('scroll', onScroll);
        }
    }, []);


    const scrollToBottom = () => {
        window.scrollTo({top: 1000});
    }
    return <div key={total} className={classNames("floating-total", {'show': show})}
        onClick={show ? scrollToBottom : undefined}>
        <span className="fw-bold">Total:</span>
        <span className="ps-3">${total.toFixed(2)}</span>
    </div>
}