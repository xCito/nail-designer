import { PropsWithChildren } from "react";
import { Tabs } from "./Tabs";
import classNames from "classnames";
import { PriceFooter } from "../footer/PriceFooter";


interface PanelProps extends PropsWithChildren {
  className?: string;
}

export function Layout() {
  return <main className="page-layout p-2">
    <HeaderPanel>
      <h1>Stardust Factory</h1>
      <h3>By Dania</h3>
    </HeaderPanel>
    <ContentPanel className="tabbed-content">
      <Tabs />
    </ContentPanel>
    {/* <ItemsPanel>
      <li>Service Thing 1</li>
      <li>Service Thing 2</li>
      <li>Service Thing 3</li>
      <li>Service Thing 4</li>
      <li>Service Thing 5</li>
      <li>Service Thing 6</li>
    </ItemsPanel> */}
    <FooterPanel className="price-footer">
      <PriceFooter />
    </FooterPanel>
  </main>
}

export function HeaderPanel(p: PropsWithChildren) {
  return <header className="header-panel fancy-font pt-2 pb-3 px-2">
    {p.children}
  </header>
}

export function FooterPanel(p: PanelProps) {
  return <header className={classNames(p.className, "footer-panel")}>
    {p.children}
  </header>
}

export function ContentPanel(p: PanelProps) {
  return <section className={classNames(p.className, "content-panel")}>
    {p.children}
  </section>
}

export function NailPanel(p: PropsWithChildren) {
  return <div className="nail-panel">
    {p.children}
  </div>
}

export function ItemsPanel(p: PanelProps) {
  return <section className={classNames(p.className, "items-panel")}>
    {p.children}
  </section>
}