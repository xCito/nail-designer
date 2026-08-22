import classnames from 'classnames';
import { ReactNode } from "react";

interface Props {
    title: string | ReactNode;
    children: ReactNode | undefined;
    isExpanded: boolean;
    onHeaderClick: () => void;

}

export function DesignSection({title, children, isExpanded, onHeaderClick}: Props) {
 
    return <div className={classnames("design-section position-relative d-flex flex-column w-100", {'open': isExpanded})}>
    <div className="section-header px-2 py-2 d-flex align-items-center" onClick={onHeaderClick}>
      <h3 className="m-0 flex-grow-1">{title}</h3>
    </div>
    <div className="section-body">
      {children}
    </div>
  </div>;
}