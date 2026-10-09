import { Subscriber } from '../types';

// Purge previous mock/fake database
try {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('herhorizon_subscribers_v1');
  }
} catch {
  // Ignore storage access errors
}

const STORAGE_KEY = 'herhorizon_subscribers_live_v2';
const ADMIN_AUTH_KEY = 'herhorizon_admin_auth';

// Clean, empty initial subscriber database
const INITIAL_SUBSCRIBERS: Subscriber[] = [];

export function getSubscribers(): Subscriber[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBSCRIBERS));
      return INITIAL_SUBSCRIBERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SUBSCRIBERS;
  }
}

export function addSubscriber(
  nameOrEmail: string,
  emailOrSource?: string,
  optionalSource = '72-Hour Reset'
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

  const current = getSubscribers();
  
  const existing = current.find((s) => s.email.toLowerCase() === email);
  if (existing) {
    if (name && !existing.name) {
      existing.name = name;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new Event('herhorizon_storage_updated'));
    }
    return { success: true, subscriber: existing, isNew: false };
  }

  const newIdNumber = Math.floor(1000 + Math.random() * 9000);
  const newSubscriber: Subscriber = {
    id: `HH-${newIdNumber}`,
    name: name || undefined,
    email,
    createdAt: new Date().toISOString(),
    source,
    status: 'sent',
    clickedOffer: false,
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
  const headers = ['ID', 'Name', 'Email Address', 'Date Subscribed (ISO)', 'Date (Formatted)', 'Source', 'Status', 'Offer Clicked'];
  
  const rows = subscribers.map((sub) => [
    `"${sub.id}"`,
    `"${sub.name || 'Anonymous'}"`,
    `"${sub.email}"`,
    `"${sub.createdAt}"`,
    `"${new Date(sub.createdAt).toLocaleDateString()} ${new Date(sub.createdAt).toLocaleTimeString()}"`,
    `"${sub.source}"`,
    `"${sub.status}"`,
    `"${sub.clickedOffer ? 'Yes' : 'No'}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `HerHorizon_Subscribers_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
