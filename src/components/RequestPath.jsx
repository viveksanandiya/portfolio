import { requestPath } from '../data/site.js';

/** Must match the animation duration and descent window in index.css. */
const CYCLE_SECONDS = 3.4;
const DESCENT_START = 0.08;
const DESCENT_SPAN = 0.7;

/**
 * The signature element.
 *
 * A request travels client → edge → server → data, and a brass dot walks that
 * path while each layer lights up as it arrives. It is here because it says
 * "fullstack" far more precisely than the word does, and because the layer
 * motif it establishes comes back in the skills cross-section and the rail.
 *
 * Every layer's delay is derived from its own position on the spine, so this
 * stays in sync if a layer is added or removed. Deliberately no timings or
 * throughput numbers: they would be invented, and this is a diagram, not
 * telemetry.
 */
export function RequestPath() {
  const lastIndex = requestPath.length - 1;

  return (
    <figure className="rounded-tool border border-line bg-well">
      <figcaption className="flex items-baseline justify-between gap-4 border-b border-edge px-6 py-3.5">
        <span className="font-mono text-micro uppercase text-bone">Request path</span>
        <span className="font-mono text-micro uppercase text-dim">the part I own</span>
      </figcaption>

      <div
        className="relative px-6 [--trace-row:48px] sm:[--trace-row:56px]"
        style={{
          '--trace-span': lastIndex,
          '--trace-travel': 'calc(var(--trace-row) * var(--trace-span))',
        }}
      >
        {/* The spine runs from the centre of the first row to the centre of the last. */}
        <span
          aria-hidden="true"
          className="absolute left-6 w-px bg-edge"
          style={{
            top: 'calc(var(--trace-row) / 2)',
            height: 'var(--trace-travel)',
          }}
        />
        <span
          aria-hidden="true"
          className="trace-dot absolute left-6 size-[7px] rounded-full bg-brass shadow-[0_0_10px_2px_rgba(224,165,66,0.35)]"
          style={{ top: 'calc(var(--trace-row) / 2)', marginTop: '-3.5px' }}
        />

        <ul>
          {requestPath.map((layer, index) => {
            const progress = lastIndex === 0 ? 0 : index / lastIndex;
            const delay = `${((DESCENT_START + DESCENT_SPAN * progress) * CYCLE_SECONDS).toFixed(3)}s`;

            return (
              <li
                key={layer.layer}
                className="flex h-[var(--trace-row)] items-center gap-4"
                style={{ '--trace-delay': delay }}
              >
                <span aria-hidden="true" className="trace-row-tick h-px w-3 shrink-0 bg-line" />
                <span className="trace-row-label font-mono text-meta uppercase text-mute">
                  {layer.layer}
                </span>
                <span className="ml-auto truncate font-mono text-[10px] tracking-[0.08em] text-dim">
                  {layer.stack}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="border-t border-edge px-6 py-3.5 font-mono text-micro uppercase text-dim">
        Four layers · one developer
      </p>
    </figure>
  );
}
