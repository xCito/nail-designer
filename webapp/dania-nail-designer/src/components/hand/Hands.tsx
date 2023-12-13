import classNames from "classnames";
import { Finger } from "./Finger";
import { HandDesign } from "@/constants/design-constants";

interface Props {
  hand: HandDesign;
}
export function Hands({hand}: Props) {
  
  return <div className={classNames("hands", hand.length)}>
    {/* <div className="hand d-flex w-100 justify-content-center position-absolute"> */}
      <Finger shape={hand.shape} length={hand.length} />
      <Finger shape={hand.shape} length={hand.length} />
      <Finger shape={hand.shape} length={hand.length} />
      <Finger shape={hand.shape} length={hand.length} />
      <Finger shape={hand.shape} length={hand.length} />
    {/* </div> */}

  </div>
}