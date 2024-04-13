import { ReactNode } from "react";


interface Props {
  title: string;
  columns?: number;
  gap?: number;
  children?: ReactNode;
  className?: string;

}
export function TitledGridContainer(p: Props) {
  const {title, children, columns = 3, gap} = p;
  return <section className={`service-section section-container p-2 col-${columns} gapH-${gap} ${p.className}`}>
    {title && <h4 className="ps-1 fw-normal">{title}</h4>}
    {children}
  </section>
}