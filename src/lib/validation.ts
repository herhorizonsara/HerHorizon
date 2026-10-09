/**
 * Lead Validation & Verification Helper
 * Ensures users provide a genuine name and legitimate email provider (Gmail, Outlook, Yahoo, etc.)
 * rather than random letters or keyboard mashing before unlocking the Free 72-Hour Reset Guide.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Trusted / standard consumer email domains
const POPULAR_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'yahoo.com',
  'ymail.com',
  'rocketmail.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'proton.me',
  'protonmail.com',
  'aol.com',
  'zoho.com',
  'mail.com',
  'gmx.com',
  'fastmail.com',
  'hey.com',
]);

// Known fake/throwaway/gibberish keywords
const BANNED_PATTERNS = [
  'asdf',
  'qwer',
  'zxcv',
  'hjkl',
  '1234',
  'fake',
  'dummy',
  'test@test',
  'none@',
  'noemail',
  'qwerty',
  'random',
];

export function validateName(name: string): ValidationResult {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter your first name.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.' };
  }
  if (/^[^a-zA-Z]+$/.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid personal name.' };
  }
  return { isValid: true };
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = (email || '').trim().toLowerCase();
  
  if (!trimmed) {
    return { isValid: false, error: 'Please enter your email address.' };
  }

  // Basic RFC pattern check
  const basicRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!basicRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a properly formatted email (e.g. name@gmail.com).' };
  }

  const [localPart, domain] = trimmed.split('@');

  // Check against banned/random test substrings
  for (const pattern of BANNED_PATTERNS) {
    if (trimmed.includes(pattern)) {
      return {
        isValid: false,
        error: 'Please enter your real email address (like Gmail or Outlook) rather than test characters.',
      };
    }
  }

  // Prevent local-part single character or repeated identical characters like aaaa@, 1111@
  if (localPart.length < 2) {
    return { isValid: false, error: 'Email username is too short. Please provide a complete email.' };
  }

  if (/^(.)\1{3,}$/.test(localPart)) {
    return { isValid: false, error: 'Please enter a genuine email address, not repeated characters.' };
  }

  // Disallow long local parts with zero vowels (e.g., "sdfghjkl@...")
  if (localPart.length >= 6 && !/[aeiouy0-9]/.test(localPart)) {
    return { isValid: false, error: 'This email appears to be random letters. Please enter your real email.' };
  }

  // Check domain validity
  if (!domain || domain.indexOf('.') === -1) {
    return { isValid: false, error: 'Please provide a full domain name (e.g. @gmail.com or @outlook.com).' };
  }

  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  const domainName = domainParts[0];

  // Disallow fake domains like a.b or test.com
  if (domainName.length < 2 || tld.length < 2) {
    return { isValid: false, error: 'Please enter a valid email domain (e.g. @gmail.com).' };
  }

  if (['test', 'example', 'fake', 'asdf', 'qwer', 'xxx'].includes(domainName)) {
    return { isValid: false, error: 'Please enter a real email provider (like Gmail, Outlook, Yahoo, or iCloud).' };
  }

  // If it's one of the popular providers or has a standard valid top-level domain
  const isPopular = POPULAR_DOMAINS.has(domain);
  const isValidTLD = /^[a-z]{2,10}$/.test(tld);

  if (!isPopular && !isValidTLD) {
    return {
      isValid: false,
      error: 'Please use a recognized email provider like Gmail, Outlook, Yahoo, iCloud, or a valid work/personal domain.',
    };
  }

  return { isValid: true };
}
