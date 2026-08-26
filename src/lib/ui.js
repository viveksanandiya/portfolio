/** Shared class strings and helpers, so spacing and label styling stay identical
 *  across sections instead of being re-typed (and drifting) in each one. */

/** Joins class names, skipping anything falsy. Saves a clsx dependency. */
export const cx = (...parts) => parts.filter(Boolean).join(' ');

/** The one horizontal rhythm for the whole page. */
export const container = 'mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-14';

/** Mono label treatment used for every eyebrow, tick and readout. */
export const label = 'font-mono text-micro uppercase';

/** Vertical rhythm between major sections. */
export const sectionSpace = 'py-24 sm:py-32 lg:py-40';

/** `https://example.com/path` → `example.com`. Falls back to the raw string. */
export const hostOf = (url) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};
