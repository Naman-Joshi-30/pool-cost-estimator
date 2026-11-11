/**
 * Centralized Configuration & Client Theming Engine
 * Pool Cost Estimator & Landing Page System
 * 
 * Single source of truth for:
 * 1. Presaved client profiles (add new clients here in 10 seconds)
 * 2. Theme color palettes (widget & landing page)
 * 3. Client URL parameter resolution (?c=tag or query overrides)
 * 4. Input validation engine & formatting rules
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PoolConfig = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // 1. DEFAULT PROFILE (Apex Custom Pools)
  const DEFAULT_PROFILE = {
    key: 'apex',
    name: 'Apex Custom Pools',
    legalName: 'Apex Custom Pools & Spas, LLC',
    phone: '(555) 392-8821',
    city: 'Dallas-Fort Worth, TX',
    theme: 'cyan'
  };

  // 2. PRESAVED CLIENT PROFILES
  // To add a new client in the future, just add one entry here!
  const CLIENT_PROFILES = {
    // Demonstration & Reference Profiles
    lonestar: {
      name: 'Lone Star Custom Pools',
      legalName: 'Lone Star Custom Pools, LLC',
      phone: '(214) 555-0199',
      city: 'Dallas-Fort Worth, TX',
      theme: 'amber'
    },
    bluewave: {
      name: 'BlueWave Pools & Spas',
      legalName: 'BlueWave Pools & Spas, Inc.',
      phone: '(407) 555-8821',
      city: 'Orlando, FL',
      theme: 'cyan'
    },
    desert: {
      name: 'Desert Oasis Pools',
      legalName: 'Desert Oasis Pools & Landscapes',
      phone: '(480) 555-3412',
      city: 'Scottsdale, AZ',
      theme: 'emerald'
    },
    premier: {
      name: 'Premier Luxury Pools',
      legalName: 'Premier Luxury Pools Group',
      phone: '(713) 555-9200',
      city: 'Houston, TX',
      theme: 'navy'
    },

    // Sprint Batch 1 Verified Targets (Ready for 1-Click Touch 2 Demos)
    eliteol: {
      name: 'Elite Outdoor Living',
      legalName: 'Elite Outdoor Living LLC',
      phone: '(469) 742-3802',
      city: 'Frisco, TX',
      theme: 'amber'
    },
    premierparadise: {
      name: 'Premier Paradise',
      legalName: 'Premier Paradise, Inc.',
      phone: '(602) 320-7057',
      city: 'Gilbert, AZ',
      theme: 'navy'
    },
    liquidevolution: {
      name: 'Liquid Evolution Pools',
      legalName: 'Liquid Evolution Pools LLC',
      phone: '(480) 518-8743',
      city: 'Scottsdale, AZ',
      theme: 'cyan'
    },
    livingstone: {
      name: 'Living Stone Pools',
      legalName: 'Living Stone Pools LLC',
      phone: '(480) 797-4089',
      city: 'Scottsdale, AZ',
      theme: 'emerald'
    },
    allseasons: {
      name: 'All Seasons Pools',
      legalName: 'All Seasons Pool Service, Inc.',
      phone: '(407) 871-2020',
      city: 'Orlando, FL',
      theme: 'cyan'
    },
    poolpro: {
      name: 'Pool Pro Agency',
      legalName: 'Pool Pro Agency Inc.',
      phone: '(778) 766-3830',
      city: 'North America',
      theme: 'cyan'
    },
    halstead: {
      name: 'Halstead Media Group',
      legalName: 'Halstead Media Group LLC',
      phone: '(800) 555-0199',
      city: 'National',
      theme: 'emerald'
    },
    poolmarketing: {
      name: 'PoolMarketing.com',
      legalName: 'PoolMarketing.com Inc.',
      phone: '(916) 467-9118',
      city: 'Sacramento, CA',
      theme: 'navy'
    },
    poolbuilderleads: {
      name: 'PoolBuilderLeads.ai',
      legalName: 'JP Innovation Inc.',
      phone: '(224) 567-1650',
      city: 'Chicago, IL',
      theme: 'amber'
    },
    backyardmarketing: {
      name: 'Backyard Marketing Pros',
      legalName: 'AAMP Agency / Backyard Marketing Pros',
      phone: '(800) 555-0144',
      city: 'National',
      theme: 'emerald'
    }
  };

  // 3. COLOR THEME PALETTES
  const THEMES = {
    amber: {
      name: 'amber',
      primary: '#d97706',
      hover: '#b45309',
      dark: '#78350f',
      veryDark: '#451a03',
      light: '#fef3c7',
      textLight: '#92400e',
      accent: '#fde68a',
      grad: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)',
      gradText: 'linear-gradient(to right, #d97706, #f59e0b)'
    },
    emerald: {
      name: 'emerald',
      primary: '#059669',
      hover: '#047857',
      dark: '#064e3b',
      veryDark: '#022c22',
      light: '#d1fae5',
      textLight: '#065f46',
      accent: '#a7f3d0',
      grad: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
      gradText: 'linear-gradient(to right, #059669, #10b981)'
    },
    navy: {
      name: 'navy',
      primary: '#2563eb',
      hover: '#1d4ed8',
      dark: '#0f172a',
      veryDark: '#020617',
      light: '#dbeafe',
      textLight: '#1e40af',
      accent: '#bfdbfe',
      grad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      gradText: 'linear-gradient(to right, #2563eb, #38bdf8)'
    },
    cyan: {
      name: 'cyan',
      primary: '#0284c7',
      hover: '#0369a1',
      dark: '#082f49',
      veryDark: '#031726',
      light: '#e0f2fe',
      textLight: '#0369a1',
      accent: '#bae6fd',
      grad: 'linear-gradient(135deg, #082f49 0%, #0284c7 100%)',
      gradText: 'linear-gradient(to right, #0284c7, #38bdf8)'
    }
  };

  // 4. CLIENT RESOLUTION UTILITY
  function resolveClient(searchString) {
    const params = new URLSearchParams(searchString || '');
    const clientKey = (params.get('c') || params.get('client') || '').trim().toLowerCase();
    
    const matched = CLIENT_PROFILES[clientKey] || null;
    
    const name = params.get('company') || params.get('name') || (matched ? matched.name : DEFAULT_PROFILE.name);
    const phone = params.get('phone') || (matched ? matched.phone : DEFAULT_PROFILE.phone);
    const city = params.get('city') || (matched ? matched.city : DEFAULT_PROFILE.city);
    const themeKey = (params.get('theme') || params.get('color') || (matched ? matched.theme : DEFAULT_PROFILE.theme) || 'cyan').toLowerCase();
    const legalName = matched ? matched.legalName : `${name}, LLC`;

    const theme = THEMES[themeKey] || THEMES.cyan;
    const webhook = params.get('webhook') || (matched ? matched.webhook : null);
    const rates = (matched && matched.rates) ? matched.rates : null;

    return {
      key: clientKey || 'default',
      isCustom: Boolean(matched || params.get('company') || params.get('name')),
      name: name,
      legalName: legalName,
      phone: phone,
      phoneClean: phone.replace(/\D/g, ''),
      city: city,
      themeKey: themeKey,
      theme: theme,
      webhook: webhook,
      rates: rates
    };
  }

  // 5. BULLETPROOF VALIDATION ENGINE
  const BANNED_EMAIL_DOMAINS = [
    'test.com', 'fake.com', 'example.com', 'asdf.com', '123.com',
    'sample.com', 'none.com', 'mailinator.com', 'tempmail.com',
    'yopmail.com', 'trashmail.com', 'guerrillamail.com'
  ];

  const BANNED_EMAIL_USERS = ['test', 'fake', 'asdf', 'admin', 'user', 'none', 'null', 'nobody', 'noone'];

  function validateName(raw) {
    if (typeof raw !== 'string') return "Full name is required.";
    const name = raw.trim();
    if (!name) return "Full name is required.";
    if (name.length < 3) return "Name must be at least 3 characters.";
    if (name.length > 60) return "Name is too long.";
    if (!/^[a-zA-Z\s'.-]+$/.test(name)) return "Name can only contain letters, spaces, hyphens, and apostrophes.";
    if (/^(.)\1+$/i.test(name.replace(/\s/g, ''))) return "Please enter a valid human name.";
    const lower = name.toLowerCase();
    if (['asdf', 'qwer', 'test', 'fake', 'none', 'unknown', 'nobody', 'abc', 'xyz', 'john doe'].includes(lower)) {
      return "Please enter your actual first & last name.";
    }
    return null;
  }

  function validatePhone(raw) {
    if (typeof raw !== 'string') return "Phone number is required for SMS estimate.";
    let d = raw.replace(/\D/g, '');
    if (d.length === 11 && d[0] === '1') d = d.slice(1);
    if (!d) return "Phone number is required for SMS estimate.";
    if (d.length !== 10) return "Please enter a complete 10-digit mobile number.";
    if (['0', '1'].includes(d[0])) return "Area code cannot start with 0 or 1.";
    if (['0', '1'].includes(d[3])) return "Invalid mobile exchange code.";
    if (/^(\d)\1{9}$/.test(d)) return "Please enter a valid, active phone number.";
    if (['0123456789', '1234567890', '9876543210', '0987654321'].includes(d)) {
      return "Sequential dummy numbers are not permitted.";
    }
    if (d.startsWith('555555') || d === '1231231234' || d === '1234561234') {
      return "Please enter a valid, active phone number.";
    }
    return null;
  }

  function validateEmail(raw) {
    if (typeof raw !== 'string') return "Email address is required.";
    const email = raw.trim().toLowerCase();
    if (!email) return "Email address is required.";
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email format (e.g. name@domain.com).";
    
    const parts = email.split('@');
    const user = parts[0];
    const domain = parts[1];
    
    if (!domain || !domain.includes('.')) return "Email domain must include a valid extension.";
    const tld = domain.split('.').pop();
    if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) return "Email has an invalid top-level domain.";
    
    if (BANNED_EMAIL_DOMAINS.includes(domain)) {
      return "Please enter a valid personal or work email (temporary domains not accepted).";
    }
    if (BANNED_EMAIL_USERS.includes(user) && ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain)) {
      return "Please enter your actual personal or business email.";
    }
    return null;
  }

  function validateZip(raw) {
    if (typeof raw !== 'string') return "Installation zip code is required.";
    const d = raw.replace(/\D/g, '');
    if (!d) return "Installation zip code is required.";
    if (d.length !== 5) return "Please enter a valid 5-digit US zip code.";
    if (/^(\d)\1{4}$/.test(d) || d === '00000') return "Please enter a valid geographic zip code.";
    return null;
  }

  function formatPhone(val) {
    if (typeof val !== 'string') return '';
    const d = val.replace(/\D/g, '').slice(0, 10);
    if (!d) return '';
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }

  return {
    DEFAULT_PROFILE,
    CLIENT_PROFILES,
    THEMES,
    resolveClient,
    validateName,
    validatePhone,
    validateEmail,
    validateZip,
    formatPhone
  };
});
