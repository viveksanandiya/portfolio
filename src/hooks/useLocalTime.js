import { useEffect, useState } from 'react';

const formatter = (timeZone) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

/**
 * The local time where Vivek is, not where the reader is — a small honest
 * status readout rather than decoration. Ticks per minute; a seconds counter
 * would be movement for its own sake.
 *
 * @param {string} timeZone IANA zone, e.g. 'Asia/Kolkata'
 */
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => {
    try {
      return formatter(timeZone).format(new Date());
    } catch {
      return '';
    }
  });

  useEffect(() => {
    let format;
    try {
      format = formatter(timeZone);
    } catch {
      return; // Unknown zone: the label simply renders without a clock.
    }

    const tick = () => {
      if (document.visibilityState === 'visible') {
        setTime(format.format(new Date()));
      }
    };

    tick();
    const id = window.setInterval(tick, 20_000);
    document.addEventListener('visibilitychange', tick);

    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [timeZone]);

  return time;
}
