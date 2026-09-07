import { Link } from 'react-router-dom'

/** Utility top bar — sits above masthead in reading order via Layout. */
export function ProtoStrip() {
  return (
    <div className="proto-strip" role="note">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1 md:px-6">
        <p className="font-medium uppercase tracking-wider">
          Unofficial · Educational prototype · Illustrative data
        </p>
        <p className="text-[0.65rem] normal-case tracking-normal text-cream/85">
          Not rbi.org.in · No official seal ·{' '}
          <Link to="/about/prototype" className="underline-offset-2 hover:underline">
            About this prototype
          </Link>
          {' · '}
          <Link to="/tour" className="underline-offset-2 hover:underline">
            Tour
          </Link>
          {' · '}
          <Link to="/sitemap" className="underline-offset-2 hover:underline">
            Sitemap
          </Link>
        </p>
      </div>
    </div>
  )
}
