export interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+966', name: 'KSA', flag: '🇸🇦' },
  { code: '+963', name: 'Syria', flag: '🇸🇾' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: '+1', name: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
];

/**
 * Formats a phone number given raw digits and country code.
 * If number starts with 0 (e.g. 0554276817), removes leading 0.
 */
export function formatPhoneNumber(rawNumber: string, countryCode: string = '+971'): string {
  let digits = rawNumber.trim().replace(/[^\d+]/g, '');
  if (!digits) return '';

  if (digits.startsWith('+')) {
    return digits; // Already has full international code
  }

  if (digits.startsWith('0')) {
    digits = digits.substring(1);
  }

  return `${countryCode}${digits}`;
}

/**
 * Cleanly formats contact value (email vs phone number).
 */
export function formatContactValue(rawValue: string, selectedCountryCode: string = '+971'): { isEmail: boolean; formatted: string; rawDigits?: string } {
  const trimmed = rawValue.trim();

  // If it's an email
  if (trimmed.includes('@')) {
    return { isEmail: true, formatted: trimmed };
  }

  const formattedPhone = formatPhoneNumber(trimmed, selectedCountryCode);
  return {
    isEmail: false,
    formatted: formattedPhone,
    rawDigits: formattedPhone.replace(/\D/g, '')
  };
}

/**
 * Validates whether the contact input matches the chosen method (WhatsApp vs Email)
 */
export function validateContactInput(rawValue: string, method: string): { isValid: boolean; errorMessage: string } {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return { isValid: false, errorMessage: '❌ Please enter your contact information.' };
  }

  if (method === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { 
        isValid: false, 
        errorMessage: '❌ Invalid Email Address! You selected Email as your preferred method. Please enter a valid email address (e.g. name@company.com).' 
      };
    }
  } else if (method === 'whatsapp') {
    if (trimmed.includes('@')) {
      return {
        isValid: false,
        errorMessage: '❌ You entered an email address, but selected WhatsApp as your preferred contact method. Please switch method to Email or enter a phone number.'
      };
    }
    const digitsOnly = trimmed.replace(/\D/g, '');
    if (digitsOnly.length < 5) {
      return { 
        isValid: false, 
        errorMessage: '❌ Invalid Phone Number! You selected WhatsApp as your preferred method. Please enter a valid phone number (e.g. 0554276817).' 
      };
    }
  }

  return { isValid: true, errorMessage: '' };
}

/**
 * Generates options HTML for country code select dropdown
 */
export function renderCountryOptions(defaultCode: string = '+971'): string {
  return COUNTRY_CODES.map(c => `
    <option value="${c.code}" ${c.code === defaultCode ? 'selected' : ''}>
      ${c.flag} ${c.code} (${c.name})
    </option>
  `).join('');
}
