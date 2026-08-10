
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  title: string;
  content: string;
}

interface TooltipProps extends Props {
  id: string;
  open: boolean;
  position: { top: number; left: number; maxWidth: number } | null;
}

export function InfoIcon(props: Props) {
  const { title, content } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number; maxWidth: number } | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const instanceId = useId();
  const tooltipId = `${instanceId}-tooltip`;

  useLayoutEffect(() => {
    if (!isOpen) {
      setTooltipPosition(null);
      return;
    }

    const updateTooltipPosition = () => {
      const trigger = wrapperRef.current;
      const tooltip = document.getElementById(tooltipId);

      if (!trigger || !tooltip) {
        return;
      }

      const triggerRect = trigger.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 12;
      const preferredWidth = Math.min(240, viewportWidth - padding * 2);
      const tooltipHeight = tooltip.offsetHeight || 120;

      let left = triggerRect.right + 8;
      let top = triggerRect.top + triggerRect.height / 2 - tooltipHeight / 2;

      if (left + preferredWidth > viewportWidth - padding) {
        left = triggerRect.left - preferredWidth - 8;
      }

      left = Math.min(Math.max(left, padding), viewportWidth - preferredWidth - padding);
      top = Math.min(Math.max(top, padding), viewportHeight - tooltipHeight - padding);

      setTooltipPosition({ top, left, maxWidth: preferredWidth });
    };

    const frame = window.requestAnimationFrame(updateTooltipPosition);
    const handleResize = () => updateTooltipPosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isOpen, tooltipId, title, content]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <span
        className={`info-icon${isOpen ? ' open' : ''}`}
        ref={wrapperRef}
        role="button"
        tabIndex={0}
        aria-label={`Show information about ${title}`}
        aria-expanded={isOpen}
        aria-controls={tooltipId}
        onClick={() => setIsOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen((value) => !value);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="mx-2"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
        </svg>
      </span>
      {isOpen ? (
        <InfoTooltip id={tooltipId} title={title} content={content} open={isOpen} position={tooltipPosition} />
      ) : null}
    </>
  );
}

export function InfoTooltip(props: TooltipProps) {
  const { title, content, id, open, position } = props;

  if (!open) {
    return null;
  }

  const isVisible = Boolean(position);

  return createPortal(
    <div
      id={id}
      className={`info-tooltip${isVisible ? ' open' : ''}`}
      role="tooltip"
      aria-hidden={!isVisible}
      style={{
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        maxWidth: position?.maxWidth ?? 240,
      }}
    >
      <h5>{title}</h5>
      <p className="fw-light">{content}</p>
    </div>,
    document.body,
  );
}