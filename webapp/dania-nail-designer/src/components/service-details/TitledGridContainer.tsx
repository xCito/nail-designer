import { ReactNode } from "react";


interface Props {
  title: string;
  columns?: number;
  gap?: number;
  children?: ReactNode;
}
export function TitledGridContainer(p: Props) {
  const {title, children, columns = 3, gap} = p;
  return <section className={`service-section section-container p-3 col-${columns} gapH-${gap}`}>
    <h4>{title}</h4>
    {children}
  </section>
}