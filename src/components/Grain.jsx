/**
 * A single static noise layer over the whole page. Without it the dark field
 * reads as flat #000; with it the page feels like a surface.
 */
export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
