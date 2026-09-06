/** localStorage helpers for the guided tour “don’t show again” preference. */

export const TOUR_DISMISS_KEY = 'rbi-proto-tour-dismissed'

export function isTourDismissed(): boolean {
  try {
    return localStorage.getItem(TOUR_DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

export function setTourDismissed(dismissed: boolean): void {
  try {
    if (dismissed) localStorage.setItem(TOUR_DISMISS_KEY, '1')
    else localStorage.removeItem(TOUR_DISMISS_KEY)
  } catch {
    /* ignore quota / private mode */
  }
}
