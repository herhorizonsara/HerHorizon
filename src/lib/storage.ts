import { Subscriber } from '../types';
import { getTrackingPayload, TrackingPayload } from './tracking';

const STORAGE_KEY = 'herhorizon_subscribers_clean_v4';
const ADMIN_AUTH_KEY = 'herhorizon_admin_auth';

// Clean, empty initial subscriber database (Zero fake/mock data)
const INITIAL_SUBSCRIBERS: Subscriber[] = [];

export function getSubscribers(): Subscriber[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBSCRIBERS));
      return INITIAL_SUBSCRIBERS;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBSCRIBERS));
      return INITIAL_SUBSCRIBERS;
    }
    return parsed;
  } catch {
    return INITIAL_SUBSCRIBERS;
  }
}

export function addSubscriber(
  nameOrEmail: string,
  emailOrSource?: string,
  optionalSource = '72-Hour Reset',
  customTracking?: Partial<TrackingPayload>
): { success: boolean; subscriber: Subscriber; isNew: boolean } {
  let name = '';
  let email = '';
  let source = optionalSource;

  if (emailOrSource && emailOrSource.includes('@')) {
    name = nameOrEmail.trim();
    email = emailOrSource.trim().toLowerCase();
  } else {
    email = nameOrEmail.trim().toLowerCase();
    source = emailOrSource || optionalSource;
  }

  // Get active session tracking data
  const trackingData = getTrackingPayload();
  const effectiveSource = customTracking?.source || trackingData.source || source || 'direct';
  const effectiveCampaign = customTracking?.campaign || trackingData.campaign || 'direct';
  const effectiveTimeOnPageSeconds = customTracking?.timeOnPageSeconds ?? trackingData.timeOnPageSeconds;
  const effectiveTimeOnPageFormatted = customTracking?.timeOnPageFormatted || trackingData.timeOnPageFormatted;
  const effectiveVslWatched = customTracking?.vslWatched ?? trackingData.vslWatched;
  const effectiveGumroadClicked = customTracking?.gumroadClicked ?? trackingData.gumroadClicked;

  const current = getSubscribers();
  
  const existing = current.find((s) => s.email.toLowerCase() === email);
  if (existing) {
    if (name && !existing.name) {
      existing.name = name;
    }
    if (effectiveVslWatched && !existing.vslWatched) {
      existing.vslWatched = true;
    }
    if (effectiveGumroadClicked && !existing.gumroadClicked) {
      existing.gumroadClicked = true;
      existing.clickedOffer = true;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('herhorizon_storage_updated'));
    return { success: true, subscriber: existing, isNew: false };
  }

  const newIdNumber = Math.floor(1000 + Math.random() * 9000);
  const newSubscriber: Subscriber = {
    id: `HH-${newIdNumber}`,
    name: name || undefined,
    email,
    createdAt: new Date().toISOString(),
    source: effectiveSource,
    campaign: effectiveCampaign,
    timeOnPageSeconds: effectiveTimeOnPageSeconds,
    timeOnPageFormatted: effectiveTimeOnPageFormatted,
    vslWatched: effectiveVslWatched,
    gumroadClicked: effectiveGumroadClicked,
    status: 'sent',
    clickedOffer: effectiveGumroadClicked,
  };

  const updated = [newSubscriber, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('herhorizon_storage_updated'));

  return { success: true, subscriber: newSubscriber, isNew: true };
}

export function deleteSubscriber(id: string): void {
  const current = getSubscribers();
  const updated = current.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('herhorizon_storage_updated'));
}

export function resetSubscribers(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBSCRIBERS));
  window.dispatchEvent(new Event('herhorizon_storage_updated'));
}

export function exportToCSV(subscribers: Subscriber[]): void {
  const headers = [
    'ID',
    'Name',
    'Email Address',
    'Date Subscribed (ISO)',
    'Date (Formatted)',
    'Traffic Source',
    'Campaign',
    'Time on Page (Formatted)',
    'Time on Page (Seconds)',
    'VSL Watched',
    'Gumroad Clicked',
    'Status',
  ];
  
  const rows = subscribers.map((sub) => [
    `"${sub.id}"`,
    `"${sub.name || 'Anonymous'}"`,
    `"${sub.email}"`,
    `"${sub.createdAt}"`,
    `"${new Date(sub.createdAt).toLocaleDateString()} ${new Date(sub.createdAt).toLocaleTimeString()}"`,
    `"${sub.source || 'direct'}"`,
    `"${sub.campaign || 'none'}"`,
    `"${sub.timeOnPageFormatted || '0s'}"`,
    `"${sub.timeOnPageSeconds ?? 0}"`,
    `"${sub.vslWatched ? 'Yes' : 'No'}"`,
    `"${sub.gumroadClicked ? 'Yes' : 'No'}"`,
    `"${sub.status}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `HerHorizon_Leads_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Campaign Links Storage Manager (Create, Pause, Archive, Delete)
export interface CampaignLinkItem {
  id: string;
  name: string;
  source: string;
  campaignSlug: string;
  destinationPath: string;
  url: string;
  clicks: number;
  status: 'active' | 'paused' | 'archived';
  createdAt: string;
}

const CAMPAIGNS_STORAGE_KEY = 'herhorizon_campaign_links_v1';

export function getCampaignLinks(): CampaignLinkItem[] {
  try {
    const raw = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
    if (!raw) {
      const defaultCampaigns: CampaignLinkItem[] = [
        {
          id: 'camp-1',
          name: 'Pinterest Solo Saturday Pin',
          source: 'pinterest',
          campaignSlug: 'solo_saturday',
          destinationPath: '/',
          url: 'https://healing.herhorizon.store/?source=pinterest&campaign=solo_saturday',
          clicks: 12,
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'camp-2',
          name: 'YouTube VSL Description Link',
          source: 'youtube',
          campaignSlug: 'vsl_launch',
          destinationPath: '/',
          url: 'https://healing.herhorizon.store/?source=youtube&campaign=vsl_launch',
          clicks: 28,
          status: 'active',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(defaultCampaigns));
      return defaultCampaigns;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCampaignLink(item: Omit<CampaignLinkItem, 'id' | 'clicks' | 'createdAt' | 'status'>): CampaignLinkItem {
  const current = getCampaignLinks();
  const newItem: CampaignLinkItem = {
    ...item,
    id: `camp-${Math.floor(1000 + Math.random() * 9000)}`,
    clicks: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...current];
  localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('herhorizon_campaigns_updated'));
  return newItem;
}

export function updateCampaignStatus(id: string, status: 'active' | 'paused' | 'archived'): void {
  const current = getCampaignLinks();
  const updated = current.map((c) => (c.id === id ? { ...c, status } : c));
  localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('herhorizon_campaigns_updated'));
}

export function deleteCampaignLink(id: string): void {
  const current = getCampaignLinks();
  const updated = current.filter((c) => c.id !== id);
  localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('herhorizon_campaigns_updated'));
}

// Auth simulation
export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function setAdminAuthenticated(val: boolean): void {
  if (val) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
