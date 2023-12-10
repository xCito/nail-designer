
interface Props {

}
export function ConsultationMenu(props: Props) {
  return <div className="text-start px-3">
    <label htmlFor="mani_type">Manicure Service: </label>
    <select id="mani_type">
      <option>Basic</option>
      <option>Polish</option>
      <option>Base gel</option>
      <option>Rubber gel</option>
      <option>Hard gel</option>
      <option>Poly gel</option>
    </select>

    <br />

    <label>Removal: </label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Non</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Polish</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Base gel</label>
    <input type="radio" name="removal" id="" />
    <label htmlFor="">Full take down</label>

    <br />

    <label htmlFor="">Apply color: </label>
    <label htmlFor="">
      <input type="checkbox" name="" id="" />
      
    </label>

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