import classNames from "classnames";
import { HandDesign } from "../../types/design-types";
import { Finger } from "./Finger";
import { getLengthId } from "../../service/helpers";

interface Props {
  hand: HandDesign;
}
export function Hands({hand}: Props) {
  
  return <div className={classNames("hands", getLengthId(hand.length))}>
    {/* <div className="hand d-flex w-100 justify-content-center position-absolute"> */}
      <Finger shape={hand.shape} length={hand.length} />
      <Finger shape={hand.shape} length={hand.length} />
      <Finger shape={hand.shape} length={hand.length} />
      <Finger shape={hand.shape} length={hand.length} />
      <Finger shape={hand.shape} length={hand.length} />
    {/* </div> */}

  </div>
}