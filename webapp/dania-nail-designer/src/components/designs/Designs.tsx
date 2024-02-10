import { useState } from "react";
import classNames from "classnames";

const allOptions = [
  'Design Option20',
  'Design Option 2',
  'Design Option 3',
  'Design Option 4',
  'Design Option 5',
  'Design Option 6',
  'Design Option 7',
  'Design Option 8',
  'Design Option 9',
  'Design Option 10',
  'Design Option 11',
  'Design Option 12',
  'Design Option 13',
  'Design Option 14',
  'Design Option 15',
  'Design Option 16',
]
export function Designs() {
  const [selected, setSelected] = useState<string[]>([]);

  const onDesignClick = (opt: string) => {
    setSelected([...selected, opt]);
  }

  return <div className="design-options d-flex flex-column pe-2 w-100">
    <div className="overflow-auto">

      {selected.length > 0 && <section className="section-container d-flex flex-column gap-2">
        {selected.map(opt =>
          <div key={opt} className="selected">
            <label className="text-truncate">{opt}</label>
            <button className="link icon me-1">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 512 512">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
            </svg>
            </button>
            <span>10</span>
            <button className="link icon mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 512 512">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
              </svg>
            </button>
            <button className="link px-3 text">All</button>
            <button className="link icon mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" width={18} viewBox="0 0 384 480">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
              </svg>
            </button>
          </div>
        )}
      </section>}

      <section className="design-options-list mt-3 mb-2">
        {allOptions.map(opt =>
          <button 
            key={opt} 
            className={classNames({'outline': !selected.includes(opt)}, 'p-2')}
            disabled={selected.includes(opt)}
            onClick={() => onDesignClick(opt)} 
            children={opt} />
          )}
      </section>
    </div>

    <button className="secondary clear-btn">Clear Designs</button>
  </div>
}