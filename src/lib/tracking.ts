/**
 * HerHorizon Analytics & Tracking Engine
 * Silent front-end tracking for traffic sources, campaigns, time on page,
 * VSL engagement, and Gumroad click-through actions.
 * Excludes admin browser sessions from visitor counts and tracking metrics.
 */

export interface TrackingPayload {
  source: string;
  campaign: string;
  timeOnPageSeconds: number;
  timeOnPageFormatted: string;
  vslWatched: boolean;
  gumroadClicked: boolean;
}

const SESSION_SOURCE_KEY = 'hh_tracking_source';
const SESSION_CAMPAIGN_KEY = 'hh_tracking_campaign';
const SESSION_VSL_KEY = 'hh_tracking_vsl_watched';
const SESSION_GUMROAD_KEY = 'hh_tracking_gumroad_clicked';
const SESSION_START_TIME_KEY = 'hh_tracking_start_time';
const SESSION_VISITOR_LOGGED = 'hh_session_logged_v1';

const LOCAL_VISITORS_KEY = 'hh_analytics_visitors_count_v2';
const LOCAL_GUMROAD_CLICKS_KEY = 'hh_analytics_gumroad_clicks_count_v2';
const ADMIN_AUTH_KEY = 'herhorizon_admin_auth';

// Check if current browser session is logged in as Admin
export function isAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    // If URL path is /admin or localStorage admin auth is true
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/admin')) return true;
    if (localStorage.getItem(ADMIN_AUTH_KEY) === 'true') return true;
    return false;
  } catch {
    return false;
  }
}

// Format seconds into human readable format like '2m 14s' or '45s'
export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  if (s < 60) {
    return `${s}s`;
  }
  const minutes = Math.floor(s / 60);
  const remainingSeconds = s % 60;
  if (minutes < 60) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Detect traffic source from URL query parameter, session storage, or document referrer.
 */
export function detectTrafficSource(): { source: string; campaign: string } {
  if (typeof window === 'undefined') {
    return { source: 'direct', campaign: 'none' };
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const querySource = params.get('source') || params.get('utm_source');
    const queryCampaign = params.get('campaign') || params.get('utm_campaign') || '';

    // If explicit query parameter exists, persist to session
    if (querySource && querySource.trim()) {
      const cleanSource = querySource.trim().toLowerCase();
      const cleanCampaign = queryCampaign.trim().toLowerCase() || 'default';
      sessionStorage.setItem(SESSION_SOURCE_KEY, cleanSource);
      if (cleanCampaign) {
        sessionStorage.setItem(SESSION_CAMPAIGN_KEY, cleanCampaign);
      }
      return { source: cleanSource, campaign: cleanCampaign };
    }

    // Check if previously stored in this browser session
    const storedSource = sessionStorage.getItem(SESSION_SOURCE_KEY);
    const storedCampaign = sessionStorage.getItem(SESSION_CAMPAIGN_KEY) || 'none';
    if (storedSource) {
      return { source: storedSource, campaign: storedCampaign };
    }

    // Fallback: Infer from document.referrer
    const referrer = (document.referrer || '').toLowerCase();
    let detectedSource = 'direct';

    if (referrer) {
      if (referrer.includes('google.') || referrer.includes('bing.') || referrer.includes('duckduckgo.') || referrer.includes('yahoo.')) {
        detectedSource = 'search';
      } else if (referrer.includes('youtube.') || referrer.includes('youtu.be')) {
        detectedSource = 'youtube';
      } else if (referrer.includes('pinterest.')) {
        detectedSource = 'pinterest';
      } else if (referrer.includes('instagram.')) {
        detectedSource = 'instagram';
      } else if (referrer.includes('medium.com')) {
        detectedSource = 'medium';
      } else if (referrer.includes('facebook.') || referrer.includes('fb.')) {
        detectedSource = 'facebook';
      } else if (referrer.includes('t.co') || referrer.includes('twitter.') || referrer.includes('x.com')) {
        detectedSource = 'twitter';
      } else if (referrer.includes('tiktok.')) {
        detectedSource = 'tiktok';
      } else {
        detectedSource = 'referral';
      }
    }

    sessionStorage.setItem(SESSION_SOURCE_KEY, detectedSource);
    sessionStorage.setItem(SESSION_CAMPAIGN_KEY, 'organic');
    return { source: detectedSource, campaign: 'organic' };
  } catch {
    return { source: 'direct', campaign: 'none' };
  }
}

/**
 * Initialize silent tracking on landing page.
 * Skips counting if the current browser session is authenticated as Admin.
 */
export function initTracking(): void {
  if (typeof window === 'undefined') return;

  // CRITICAL: Do not track or count admin testing sessions
  if (isAdminSession()) return;

  try {
    detectTrafficSource();

    if (!sessionStorage.getItem(SESSION_START_TIME_KEY)) {
      sessionStorage.setItem(SESSION_START_TIME_KEY, Date.now().toString());
    }

    if (!sessionStorage.getItem(SESSION_VISITOR_LOGGED)) {
      sessionStorage.setItem(SESSION_VISITOR_LOGGED, 'true');
      const currentVisitors = parseInt(localStorage.getItem(LOCAL_VISITORS_KEY) || '0', 10);
      localStorage.setItem(LOCAL_VISITORS_KEY, (currentVisitors + 1).toString());
      window.dispatchEvent(new Event('hh_analytics_updated'));
    }
  } catch {
    // Ignore storage issues
  }
}

/**
 * Get the elapsed time on the page in seconds.
 */
export function getTimeOnPageSeconds(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const startStr = sessionStorage.getItem(SESSION_START_TIME_KEY);
    if (!startStr) {
      sessionStorage.setItem(SESSION_START_TIME_KEY, Date.now().toString());
      return 1;
    }
    const startTime = parseInt(startStr, 10);
    const elapsedSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    return elapsedSeconds;
  } catch {
    return 1;
  }
}

/**
 * Record that user interacted with or played the YouTube VSL.
 */
export function trackVslPlay(): void {
  if (typeof window === 'undefined') return;
  if (isAdminSession()) return; // Skip admin testing
  try {
    sessionStorage.setItem(SESSION_VSL_KEY, 'true');
    window.dispatchEvent(new CustomEvent('hh_tracking_event', { detail: { type: 'vsl_played' } }));
  } catch {
    // Silent
  }
}

/**
 * Returns whether VSL has been watched in this session.
 */
export function isVslWatched(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(SESSION_VSL_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Record that user clicked outbound to Gumroad for the 50% discount offer.
 */
export function trackGumroadClick(): void {
  if (typeof window === 'undefined') return;
  if (isAdminSession()) return; // Skip admin testing
  try {
    sessionStorage.setItem(SESSION_GUMROAD_KEY, 'true');
    const currentClicks = parseInt(localStorage.getItem(LOCAL_GUMROAD_CLICKS_KEY) || '0', 10);
    localStorage.setItem(LOCAL_GUMROAD_CLICKS_KEY, (currentClicks + 1).toString());
    window.dispatchEvent(new CustomEvent('hh_tracking_event', { detail: { type: 'gumroad_clicked' } }));
    window.dispatchEvent(new Event('hh_analytics_updated'));
  } catch {
    // Silent
  }
}

/**
 * Returns whether user clicked Gumroad in this session.
 */
export function isGumroadClicked(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(SESSION_GUMROAD_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Assembles the full user tracking payload to append when submitting leads.
 */
export function getTrackingPayload(): TrackingPayload {
  const { source, campaign } = detectTrafficSource();
  const timeOnPageSeconds = getTimeOnPageSeconds();
  const timeOnPageFormatted = formatDuration(timeOnPageSeconds);
  const vslWatched = isVslWatched();
  const gumroadClicked = isGumroadClicked();

  return {
    source,
    campaign,
    timeOnPageSeconds,
    timeOnPageFormatted,
    vslWatched,
    gumroadClicked,
  };
}

/**
 * Get aggregate visitor and Gumroad click metrics for the Admin Dashboard.
 */
export function getAggregateMetrics() {
  if (typeof window === 'undefined') {
    return { totalVisitors: 0, totalGumroadClicks: 0 };
  }
  try {
    const visitorsRaw = localStorage.getItem(LOCAL_VISITORS_KEY);
    const clicksRaw = localStorage.getItem(LOCAL_GUMROAD_CLICKS_KEY);

    const totalVisitors = visitorsRaw ? parseInt(visitorsRaw, 10) : 0;
    const totalGumroadClicks = clicksRaw ? parseInt(clicksRaw, 10) : 0;

    return {
      totalVisitors,
      totalGumroadClicks,
    };
  } catch {
    return { totalVisitors: 0, totalGumroadClicks: 0 };
  }
}
