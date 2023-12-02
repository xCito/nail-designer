
interface Props {

}
export function ConsultationMenu(props: Props) {
  return <div className="text-start px-3">
    <ul>
      <li>Number of Fingers (default 10)</li>
      <li>Repairs (REDO caused by breaks & lifting)</li>
      <li>Manicure (general clean up) (includes polish removal, natural nail shaping if final length)</li>

      <li>Removal</li>
      <ul>
        <li>polish removal</li>
        <li>gel removal</li>
        <li>full (takedown) removal</li>
      </ul>

      <li>Service (adding material / extensions)</li> 
      <ul>
        <li>rebalance (correct hump & alignment)</li>
        {/* <li>refill (fill-in space left by growth)</li> */}
        <li>full set (from scratch add nails)</li>
      </ul>
    </ul>
  </div>
}