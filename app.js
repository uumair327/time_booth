/**
 * Time Booth — Interactive Timeline Journey
 * ==========================================
 * Core application logic: data model, timeline rendering,
 * drag-scroll, lightbox, search, infinite scroll, animations.
 */

(function () {
  'use strict';

  // ── Constants ──
  const DOB = new Date(2002, 10, 1); // 01 November 2002
  const NOW = new Date();

  // ── Photo Data ──
  // Each entry represents a memory/photo in the timeline.
  // Users can add their own by pushing to this array.
  const MEMORIES = [
    // ── 2002 — The Beginning ──
    {
      id: '2002-baby',
      year: 2002,
      month: 11,
      title: 'The Beginning',
      description: 'Born on the 1st of November — a tiny explorer in a blue outfit, ready to take on the world.',
      image: 'photos/2002.jpg',
      era: 'childhood',
      eraLabel: 'Early Years',
      tags: ['birth', 'baby', 'beginning', 'november', '2002', 'childhood']
    },

    // ── 2004 — Toddler Days ──
    {
      id: '2004-childhood',
      year: 2004,
      month: 1,
      title: 'Childhood Memories',
      description: 'Standing tall at two — a studio portrait capturing the innocence and wonder of early childhood.',
      image: 'photos/2004.jpg',
      era: 'childhood',
      eraLabel: 'Early Years',
      tags: ['childhood', 'toddler', 'family', '2004', 'studio', 'portrait']
    },

    // ── 2015 — Teen Years ──
    {
      id: '2015-teen',
      year: 2015,
      month: 1,
      title: 'The Cool Phase',
      description: 'Rocking the shades and the attitude — every teenager has that one iconic pose they never forget.',
      image: 'photos/2015.jpg',
      era: 'teen',
      eraLabel: 'Teenage Years',
      tags: ['teen', 'cool', 'sunglasses', '2015', 'attitude', 'selfie']
    },

    // ── 2016 ──
    {
      id: '13-mar-2016',
      year: 2016,
      month: 3,
      title: 'March Moments',
      description: 'A candid moment from March 2016 — the kind of memories that sneak up on you years later.',
      image: 'photos/13_march_2016.jpg',
      era: 'teen',
      eraLabel: 'Teenage Years',
      tags: ['march', '2016', 'candid', 'friends', 'teen']
    },

    // ── 2019 — High School ──
    {
      id: '2019-memory',
      year: 2019,
      month: 1,
      title: 'High School Days',
      description: 'A snapshot from high school — the era of textbooks, friendships, and big dreams taking shape.',
      image: 'photos/2019.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['school', 'high school', '2019', 'friends', 'memories']
    },
    {
      id: '2019-picnic',
      year: 2019,
      month: 1,
      title: 'Picnic Day',
      description: 'A perfect picnic day — sunshine, good food, and even better company under the open sky.',
      image: 'photos/2019_picnic.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['picnic', 'outdoors', 'friends', 'sunshine', '2019']
    },

    // ── 2020 — Senior Year & Early College Prep ──
    {
      id: '2020-memory',
      year: 2020,
      month: 1,
      title: 'The Year That Changed Everything',
      description: 'A year of uncertainty and resilience — adapting to a world that looked very different overnight.',
      image: 'photos/2020.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['2020', 'pandemic', 'resilience', 'change']
    },
    {
      id: 'aug-2020',
      year: 2020,
      month: 8,
      title: 'August Vibes',
      description: 'Midsummer moments captured — finding joy in the little things during unusual times.',
      image: 'photos/aug_2020.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['august', 'summer', '2020', 'casual']
    },
    {
      id: 'sep-2020',
      year: 2020,
      month: 9,
      title: 'September Chronicles',
      description: 'As the monsoon winds settled, new routines and rhythms started falling into place.',
      image: 'photos/sep_2020.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['september', 'monsoon', '2020', 'routine']
    },
    {
      id: 'oct-2020',
      year: 2020,
      month: 10,
      title: 'October Reflections',
      description: 'Festive season warmth in the air — a quiet moment amidst celebrations.',
      image: 'photos/oct_2020.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['october', 'festival', '2020', 'autumn']
    },
    {
      id: '17-nov-2020',
      year: 2020,
      month: 11,
      title: 'November Snapshot',
      description: 'A cozy November day, capturing the quiet beauty of the season as the year wound down.',
      image: 'photos/17_nov_2020.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['november', '2020', 'autumn', 'cozy']
    },
    {
      id: 'nov-2020',
      year: 2020,
      month: 11,
      title: 'Late November',
      description: 'The last warm days before winter — filled with nostalgia and anticipation for what\'s next.',
      image: 'photos/nov_2020.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['november', '2020', 'nostalgia', 'season']
    },
    {
      id: '28-nov-2020',
      year: 2020,
      month: 11,
      title: 'Birthday Month Vibes',
      description: 'The birthday month energy — turning a year older with gratitude and excitement.',
      image: 'photos/28_nov_2020.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['birthday', 'november', '2020', 'celebration']
    },
    {
      id: '3-dec-2020-bye12th',
      year: 2020,
      month: 12,
      title: 'Goodbye 12th Grade',
      description: 'The final farewell to school life — closing one chapter to begin an exciting new one.',
      image: 'photos/3_december_2020_byebye12th.jpg',
      era: 'school',
      eraLabel: 'School Days',
      tags: ['12th', 'farewell', 'school', 'graduation', 'goodbye', 'december']
    },

    // ── 2021 — Transition Year ──
    {
      id: '3-apr-2021',
      year: 2021,
      month: 4,
      title: 'Spring Beginnings',
      description: 'A fresh start in April — embracing new possibilities after school and stepping into the unknown.',
      image: 'photos/3_april_2021.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['april', 'spring', '2021', 'new beginnings']
    },
    {
      id: '15-may-2021',
      year: 2021,
      month: 5,
      title: 'May Group Moment',
      description: 'With friends by my side — a candid group shot full of laughter and shared stories.',
      image: 'photos/15_may_2021.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['may', 'friends', 'group', '2021', 'laughter']
    },
    {
      id: '15-may-2021-solo',
      year: 2021,
      month: 5,
      title: 'Solo Portrait',
      description: 'A quiet solo moment — sometimes the best company is your own thoughts.',
      image: 'photos/15_may_2021_solo.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['solo', 'portrait', 'may', '2021', 'reflection']
    },
    {
      id: '10-july-2021',
      year: 2021,
      month: 7,
      title: 'Summer of \'21',
      description: 'Midsummer memories — long days, late sunsets, and the freedom that comes with youth.',
      image: 'photos/10_july_2021.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['july', 'summer', '2021', 'freedom', 'youth']
    },

    // ── 2022 ──
    {
      id: '21-apr-2022',
      year: 2022,
      month: 4,
      title: 'April Adventures',
      description: 'Spring brought new adventures and experiences — exploring, learning, and growing every day.',
      image: 'photos/21_april_2022.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['april', 'adventure', '2022', 'spring', 'exploring']
    },

    // ── 2023 ──
    {
      id: '19-jan-2023',
      year: 2023,
      month: 1,
      title: 'New Year Energy',
      description: 'Kicking off 2023 with fresh goals and renewed ambition — the best was yet to come.',
      image: 'photos/19_jan_2023.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['january', 'new year', '2023', 'goals', 'ambition']
    },
    {
      id: '12-dec-2023',
      year: 2023,
      month: 12,
      title: 'December Gathering',
      description: 'Year-end celebrations with the crew — reflecting on a year of growth and camaraderie.',
      image: 'photos/12_dec_2023.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['december', 'friends', '2023', 'celebration', 'year-end']
    },
    {
      id: '14-dec-devfest',
      year: 2023,
      month: 12,
      title: 'First DevFest',
      description: 'Attending my very first DevFest — immersed in tech talks, networking, and developer culture.',
      image: 'photos/14_december_first_dev_fest.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['devfest', 'tech', 'developer', 'event', 'google', 'december', '2023']
    },
    {
      id: '21-dec-2023',
      year: 2023,
      month: 12,
      title: 'Winter Memories',
      description: 'End-of-year magic — cozy winter vibes and the warmth of good company.',
      image: 'photos/21_dec_2023.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['winter', 'december', '2023', 'cozy', 'friends']
    },

    // ── 2024 — Senior Year & Graduation ──
    {
      id: '7-feb-2024-datazen',
      year: 2024,
      month: 2,
      title: 'DataZen Event',
      description: 'Deep-diving into the world of data science at the DataZen event — every insight sparked new curiosity.',
      image: 'photos/7_feb_2024_datazen.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['datazen', 'data science', 'event', 'tech', 'february', '2024']
    },
    {
      id: '27-feb-2024-google',
      year: 2024,
      month: 2,
      title: 'Google Event',
      description: 'A milestone moment at a Google-hosted event — rubbing shoulders with industry leaders and innovators.',
      image: 'photos/27_feb_2024_google_event.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['google', 'tech event', 'industry', 'february', '2024', 'networking']
    },
    {
      id: '1-mar-2024-ml-intro',
      year: 2024,
      month: 3,
      title: 'ML Introduction Event',
      description: 'Hosting an introduction to Machine Learning — from student to speaker, sharing knowledge with peers.',
      image: 'photos/1_march_2024_event_ml_intro.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['machine learning', 'ML', 'event', 'speaker', 'march', '2024', 'tech']
    },
    {
      id: '27-apr-2024-samsung',
      year: 2024,
      month: 4,
      title: 'Samsung Office Visit',
      description: 'A visit to the Samsung office — exploring cutting-edge tech and getting a glimpse behind the scenes.',
      image: 'photos/27_april_2024_samsung_office.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['samsung', 'office', 'tech', 'visit', 'april', '2024', 'industry']
    },
    {
      id: 'may-2024-campus',
      year: 2024,
      month: 5,
      title: 'Campus Days',
      description: 'Cherishing the final moments on campus — every corner held a story worth remembering.',
      image: 'photos/IMG20240509163136.jpg',
      era: 'college',
      eraLabel: 'College Era',
      tags: ['campus', 'college', 'may', '2024', 'memories', 'farewell']
    },
    {
      id: 'july-2024-first-flight',
      year: 2024,
      month: 7,
      title: 'First Flight ✈️',
      description: 'Taking to the skies for the very first time — the world looked different from 35,000 feet.',
      image: 'photos/july_2024_first_flight.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['flight', 'first time', 'travel', 'aviation', 'july', '2024', 'milestone']
    },
    {
      id: '31-aug-2024-snapchat',
      year: 2024,
      month: 8,
      title: 'Snapchat Office',
      description: 'Visiting the Snapchat office — a dream-like experience exploring where innovation meets creativity.',
      image: 'photos/31_aug_2024_snapchat_office.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['snapchat', 'office', 'tech', 'visit', 'august', '2024', 'creative']
    },

    // ── 2025 ──
    {
      id: '8-may-2025-blackbook',
      year: 2025,
      month: 5,
      title: 'Engineering Blackbook Submission',
      description: 'Submitting the engineering blackbook — months of research and hard work bound into one final project.',
      image: 'photos/8_may_2025_eng_blackbook_submission.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['engineering', 'blackbook', 'project', 'submission', 'may', '2025', 'milestone']
    },
    {
      id: '19-june-2025-aws',
      year: 2025,
      month: 6,
      title: 'AWS Event',
      description: 'Diving into cloud computing at an AWS event — the future is serverless and scalable.',
      image: 'photos/19_june_2025_aws_event.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['AWS', 'cloud', 'tech event', 'june', '2025', 'computing']
    },

    // ── 2026 — Present ──
    {
      id: '29-mar-2026-matheran',
      year: 2026,
      month: 3,
      title: 'Solo Matheran Trip',
      description: 'A solo adventure to Matheran — finding peace in nature, away from the noise of the city.',
      image: 'photos/29_march_2026_solo_matheran_trip.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['matheran', 'solo', 'trip', 'travel', 'nature', 'march', '2026', 'hills']
    },
    {
      id: '2-aug-2026-barkas',
      year: 2026,
      month: 8,
      title: 'Barkas Outing',
      description: 'Exploring the vibrant streets and food lanes of Barkas — culture, flavors, and good times.',
      image: 'photos/2_aug_2026_barkas.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['barkas', 'outing', 'food', 'culture', 'august', '2026']
    },
    {
      id: '4-aug-2026-chinese',
      year: 2026,
      month: 8,
      title: 'Nom Nom Chinese',
      description: 'A delicious Chinese food adventure — because great conversations happen over great meals.',
      image: 'photos/4_aug_2026_nom_nom_chinnesse.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['chinese', 'food', 'restaurant', 'friends', 'august', '2026', 'nom nom']
    },
    {
      id: '2-sep-2026-ascent',
      year: 2026,
      month: 9,
      title: 'Hosted Event — Ascent',
      description: 'Organizing and hosting Ascent — a tech event bringing together minds, ideas, and innovation.',
      image: 'photos/2_sep_2026_hosted_event_ascent.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['ascent', 'event', 'hosting', 'organizer', 'tech', 'september', '2026']
    },
    {
      id: '2-sep-2026-indore',
      year: 2026,
      month: 9,
      title: 'Indore Night Trip',
      description: 'A spontaneous night trip to Indore with roommates — the best memories are the unplanned ones.',
      image: 'photos/2_sept_2026_roommate_indore_night_trip.jpg',
      era: 'professional',
      eraLabel: 'Professional Life',
      tags: ['indore', 'night', 'trip', 'roommates', 'spontaneous', 'september', '2026']
    }
  ];

  // Era definitions with year ranges
  const ERAS = [
    { id: 'childhood', label: 'Early Years', range: '2002 — 2004', color: '#ffd93d' },
    { id: 'teen', label: 'Teenage Years', range: '2015 — 2016', color: '#4d96ff' },
    { id: 'school', label: 'School Days', range: '2019 — 2020', color: '#6bcb77' },
    { id: 'college', label: 'College Era', range: '2021 — 2024', color: '#7c5cfc' },
    { id: 'professional', label: 'Professional Life', range: '2024 — Present', color: '#00e59b' }
  ];

  // ── State ──
  let currentView = 'booth'; // 'booth' | 'grid'
  let filteredMemories = [...MEMORIES];
  let lightboxIndex = -1;
  let isDragging = false;
  let dragStartX = 0;
  let scrollStartX = 0;
  let dragHintShown = false;
  let lastScrollY = 0;
  let navHidden = false;

  // ── DOM References ──
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Utilities ──

  /** Calculate exact age from DOB */
  function calculateAge(dob, now) {
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((now - dob) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }

  /** Calculate age at a specific year/month */
  function ageAtDate(year, month = 1) {
    const date = new Date(year, month - 1, 1);
    if (date < DOB) return 0;
    let age = year - DOB.getFullYear();
    if (month <= DOB.getMonth() + 1) age--;
    return Math.max(0, age);
  }

  /** Debounce function */
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /** Sanitize HTML to prevent XSS */
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /** Highlight matching text in search results */
  function highlightText(text, query) {
    if (!query || !text) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return escaped.replace(regex, '<mark style="background: var(--accent-subtle); color: var(--accent); border-radius: 2px; padding: 0 2px;">$1</mark>');
  }

  // ── Initialization ──

  function init() {
    updateAge();
    renderJourneyStats();
    buildYearNav();
    renderTimeline();
    renderGrid();
    renderGallery();
    setupDragScroll();
    setupLightbox();
    setupSearch();
    setupNavigation();
    setupViewToggle();
    setupSurpriseMe();
    setupScrollToTop();
    setupIntersectionObserver();
    setupKeyboardNav();
    startAgeCounter();
    showDragHint();
  }

  // ── Age Display ──

  function updateAge() {
    const age = calculateAge(DOB, NOW);

    // Hero stats
    animateCounter('stat-years', age.years);
    animateCounter('stat-months', age.months);
    animateCounter('stat-days', age.days);
    animateCounter('stat-photos', MEMORIES.length);

    // Nav badge
    const badge = $('#nav-age-badge');
    if (badge) badge.textContent = `Age ${age.years}`;

    // Footer year
    const footerYear = $('#footer-year');
    if (footerYear) footerYear.textContent = NOW.getFullYear();
  }

  // ── Journey Stats Bar ──

  function renderJourneyStats() {
    const totalPhotos = MEMORIES.length;
    const years = MEMORIES.map(m => m.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const timelineSpan = (maxYear - minYear) + 1;
    const totalEras = ERAS.length;

    animateCounter('js-total-photos', totalPhotos, 1200);
    animateCounter('js-total-years', timelineSpan, 1300);
    animateCounter('js-total-eras', totalEras, 1400);

    const rangeEl = document.getElementById('js-year-range');
    if (rangeEl) {
      rangeEl.textContent = `${minYear} — ${maxYear}`;
    }
  }

  function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;

    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const isLarge = target > 100;

    function tick() {
      current += step;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    }

    // Delay to let hero animation play first
    setTimeout(tick, 1000);
  }

  /** Live-updating age counter */
  function startAgeCounter() {
    setInterval(() => {
      const now = new Date();
      const age = calculateAge(DOB, now);
      const badge = $('#nav-age-badge');
      if (badge) {
        badge.textContent = `Age ${age.years}y ${age.months}m ${age.days}d`;
      }
    }, 60000); // Update every minute
  }

  // ── Year Navigation ──

  function buildYearNav() {
    const container = $('#year-nav');
    if (!container) return;

    const startYear = DOB.getFullYear();
    const endYear = NOW.getFullYear();
    const yearsWithPhotos = new Set(MEMORIES.map(m => m.year));

    let html = '';
    for (let y = startYear; y <= endYear; y++) {
      const hasPhotos = yearsWithPhotos.has(y);
      html += `<button class="year-nav-btn${hasPhotos ? ' has-photos' : ''}" data-year="${y}">${y}</button>`;
    }
    container.innerHTML = html;

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.year-nav-btn');
      if (!btn) return;

      const year = parseInt(btn.dataset.year);
      $$('.year-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (currentView === 'booth') {
        scrollToYear(year);
      } else {
        filterByYear(year);
      }
    });
  }

  function scrollToYear(year) {
    const track = $('#timeline-track');
    const viewport = $('#timeline-viewport');
    if (!track || !viewport) return;

    const cards = track.querySelectorAll('.timeline-card');
    for (const card of cards) {
      if (parseInt(card.dataset.year) === year) {
        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const viewportWidth = viewport.clientWidth;
        const cardOffset = cardRect.left - trackRect.left;
        const scrollTo = cardOffset - viewportWidth / 2 + card.clientWidth / 2;

        viewport.scrollTo({
          left: Math.max(0, scrollTo),
          behavior: 'smooth'
        });
        return;
      }
    }
  }

  function filterByYear(year) {
    const searchInput = $('#search-input');
    if (searchInput) {
      searchInput.value = year.toString();
      performSearch(year.toString());
    }
  }

  // ── Timeline Rendering ──

  function renderTimeline(memories = null) {
    const track = $('#timeline-track');
    if (!track) return;

    const data = memories || filteredMemories;

    if (data.length === 0) {
      track.innerHTML = '';
      showNoResults(true);
      return;
    }

    showNoResults(false);

    track.innerHTML = data.map((mem, i) => {
      const age = ageAtDate(mem.year, mem.month);
      return `
        <div class="timeline-card" data-year="${mem.year}" data-index="${i}" style="animation-delay: ${i * 0.08}s">
          <div class="card-container" data-memory-id="${mem.id}">
            <div class="card-image-wrap">
              <img src="${escapeHtml(mem.image)}" alt="${escapeHtml(mem.title)}" loading="lazy" 
                   onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%2312141c%22 width=%22400%22 height=%22300%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%234a5068%22 font-size=%2216%22 font-family=%22sans-serif%22>📷 Photo</text></svg>'">
              <div class="card-image-overlay"></div>
              <span class="card-age-tag">Age ${age}</span>
            </div>
            <div class="card-info">
              <div class="card-year">${escapeHtml(mem.year.toString())} ${mem.month ? '· ' + getMonthName(mem.month) : ''}</div>
              <div class="card-title">${escapeHtml(mem.title)}</div>
              <div class="card-description">${escapeHtml(mem.description)}</div>
              <span class="card-era ${mem.era}">${escapeHtml(mem.eraLabel)}</span>
            </div>
          </div>
          <div class="card-year-marker">${mem.year}</div>
        </div>
      `;
    }).join('');

    // Attach click handlers for lightbox
    track.querySelectorAll('.card-container').forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (isDragging) return; // Don't open lightbox during drag
        openLightbox(idx);
      });
      card.style.cursor = 'pointer';
    });

    updateScrollProgress();
  }

  function getMonthName(month) {
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month] || '';
  }

  // ── Grid View Rendering ──

  function renderGrid(memories = null) {
    const container = $('#grid-container');
    if (!container) return;

    const data = memories || filteredMemories;

    if (data.length === 0) {
      container.innerHTML = '';
      return;
    }

    // Group by era
    const grouped = {};
    ERAS.forEach(era => { grouped[era.id] = []; });
    data.forEach(mem => {
      if (grouped[mem.era]) grouped[mem.era].push(mem);
    });

    let html = '';
    ERAS.forEach(era => {
      const items = grouped[era.id];
      if (items.length === 0) return;

      html += `
        <div class="era-group reveal">
          <div class="era-header">
            <span class="era-year-range">${escapeHtml(era.range)}</span>
            <h3 class="era-name">${escapeHtml(era.label)}</h3>
          </div>
          <div class="era-grid">
            ${items.map((mem, i) => {
              const age = ageAtDate(mem.year, mem.month);
              const globalIndex = data.indexOf(mem);
              return `
                <div class="timeline-card" data-year="${mem.year}" style="flex: 0 0 auto;">
                  <div class="card-container" data-memory-id="${mem.id}" data-lightbox-index="${globalIndex}">
                    <div class="card-image-wrap">
                      <img src="${escapeHtml(mem.image)}" alt="${escapeHtml(mem.title)}" loading="lazy"
                           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%2312141c%22 width=%22400%22 height=%22300%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%234a5068%22 font-size=%2216%22 font-family=%22sans-serif%22>📷 Photo</text></svg>'">
                      <div class="card-image-overlay"></div>
                      <span class="card-age-tag">Age ${age}</span>
                    </div>
                    <div class="card-info">
                      <div class="card-year">${escapeHtml(mem.year.toString())} ${mem.month ? '· ' + getMonthName(mem.month) : ''}</div>
                      <div class="card-title">${escapeHtml(mem.title)}</div>
                      <div class="card-description">${escapeHtml(mem.description)}</div>
                      <span class="card-era ${mem.era}">${escapeHtml(mem.eraLabel)}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach click handlers
    container.querySelectorAll('.card-container').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.lightboxIndex);
        if (!isNaN(idx)) openLightbox(idx);
      });
      card.style.cursor = 'pointer';
    });

    // Re-observe for reveal animation
    setupIntersectionObserver();
  }

  // ── Gallery (Photo Wall) ──

  let currentGalleryEra = 'all';

  function renderGallery(era = currentGalleryEra) {
    currentGalleryEra = era;
    renderGalleryFilters();
    renderGalleryMasonry();
  }

  function renderGalleryFilters() {
    const container = $('#gallery-filters');
    if (!container) return;

    let html = `
      <button class="filter-chip ${currentGalleryEra === 'all' ? 'active' : ''}" data-era="all">
        All <span class="filter-count">${MEMORIES.length}</span>
      </button>
    `;

    ERAS.forEach(eraItem => {
      const count = MEMORIES.filter(m => m.era === eraItem.id).length;
      if (count > 0) {
        html += `
          <button class="filter-chip ${currentGalleryEra === eraItem.id ? 'active' : ''}" data-era="${eraItem.id}">
            ${eraItem.label} <span class="filter-count">${count}</span>
          </button>
        `;
      }
    });

    container.innerHTML = html;

    container.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedEra = btn.dataset.era;
        renderGallery(selectedEra);
      });
    });
  }

  function renderGalleryMasonry() {
    const masonry = $('#gallery-masonry');
    if (!masonry) return;

    const list = currentGalleryEra === 'all'
      ? MEMORIES
      : MEMORIES.filter(m => m.era === currentGalleryEra);

    if (list.length === 0) {
      masonry.innerHTML = `
        <div class="gallery-empty" style="grid-column: 1 / -1; width: 100%;">
          <div class="gallery-empty-icon">📷</div>
          <div class="gallery-empty-text">No photos found for this era</div>
        </div>
      `;
      return;
    }

    masonry.innerHTML = list.map((mem) => {
      const memIndex = MEMORIES.findIndex(m => m.id === mem.id);
      return `
        <div class="gallery-item reveal" data-lightbox-index="${memIndex}" data-era="${mem.era}">
          <img src="${escapeHtml(mem.image)}" alt="${escapeHtml(mem.title)}" loading="lazy" decoding="async">
          <div class="gallery-item-era ${escapeHtml(mem.era)}">${escapeHtml(mem.eraLabel)}</div>
          <div class="gallery-item-overlay">
            <div class="gallery-item-title">${escapeHtml(mem.title)}</div>
            <div class="gallery-item-year">${mem.year} · ${getMonthName(mem.month)}</div>
          </div>
        </div>
      `;
    }).join('');

    masonry.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.lightboxIndex);
        if (!isNaN(idx)) {
          filteredMemories = [...MEMORIES];
          openLightbox(idx);
        }
      });
    });

    setupIntersectionObserver();
  }

  // ── Drag / Scroll (Booth View) ──

  function setupDragScroll() {
    const viewport = $('#timeline-viewport');
    if (!viewport) return;

    let hasDragged = false;

    // Mouse drag
    viewport.addEventListener('mousedown', (e) => {
      isDragging = false;
      hasDragged = false;
      dragStartX = e.clientX;
      scrollStartX = viewport.scrollLeft;
      viewport.style.cursor = 'grabbing';
      viewport.style.scrollBehavior = 'auto';

      const onMove = (e2) => {
        const dx = e2.clientX - dragStartX;
        if (Math.abs(dx) > 5) {
          isDragging = true;
          hasDragged = true;
        }
        viewport.scrollLeft = scrollStartX - dx;
        updateScrollProgress();
      };

      const onUp = () => {
        viewport.style.cursor = 'grab';
        viewport.style.scrollBehavior = '';
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        // Reset isDragging after a tick so click handlers can check
        setTimeout(() => { isDragging = false; }, 50);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // Touch drag
    let touchStartX = 0;
    let touchScrollStart = 0;

    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchScrollStart = viewport.scrollLeft;
      isDragging = false;
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - touchStartX;
      if (Math.abs(dx) > 5) isDragging = true;
      viewport.scrollLeft = touchScrollStart - dx;
      updateScrollProgress();
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      setTimeout(() => { isDragging = false; }, 50);
    }, { passive: true });

    // Wheel → horizontal scroll (for non-trackpad)
    viewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        viewport.scrollLeft += e.deltaY;
        updateScrollProgress();
      }
    }, { passive: false });

    // Scroll event
    viewport.addEventListener('scroll', () => {
      updateScrollProgress();
      hideDragHint();
    });

    // Scroll buttons
    const scrollStep = 400;

    $('#scroll-left')?.addEventListener('click', () => {
      viewport.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });

    $('#scroll-right')?.addEventListener('click', () => {
      viewport.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });
  }

  function updateScrollProgress() {
    const viewport = $('#timeline-viewport');
    const bar = $('#scroll-progress-bar');
    if (!viewport || !bar) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maxScroll <= 0) {
      bar.style.width = '100%';
      return;
    }

    const progress = (viewport.scrollLeft / maxScroll) * 100;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;

    // Disable buttons at edges
    const leftBtn = $('#scroll-left');
    const rightBtn = $('#scroll-right');
    if (leftBtn) leftBtn.disabled = viewport.scrollLeft <= 5;
    if (rightBtn) rightBtn.disabled = viewport.scrollLeft >= maxScroll - 5;
  }

  // ── Drag Hint ──

  function showDragHint() {
    if (dragHintShown) return;
    const hint = $('#drag-hint');
    if (!hint) return;

    setTimeout(() => {
      hint.classList.add('visible');
      dragHintShown = true;

      setTimeout(() => {
        hint.classList.remove('visible');
        hint.classList.add('hidden');
      }, 3500);
    }, 2000);
  }

  function hideDragHint() {
    const hint = $('#drag-hint');
    if (hint) {
      hint.classList.remove('visible');
      hint.classList.add('hidden');
    }
  }

  // ── Lightbox ──

  function setupLightbox() {
    const overlay = $('#lightbox-overlay');
    const closeBtn = $('#lightbox-close');
    const prevBtn = $('#lightbox-prev');
    const nextBtn = $('#lightbox-next');

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', () => navigateLightbox(-1));
    nextBtn?.addEventListener('click', () => navigateLightbox(1));

    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });

    // Touch swipe gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    overlay?.addEventListener('touchstart', (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    overlay?.addEventListener('touchend', (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleLightboxSwipe();
    }, { passive: true });

    function handleLightboxSwipe() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const absDiffX = Math.abs(diffX);
      const absDiffY = Math.abs(diffY);

      // Horizontal swipe (threshold: 40px)
      if (absDiffX > 40 && absDiffX > absDiffY) {
        if (diffX < 0) {
          navigateLightbox(1); // Swipe left -> next
        } else {
          navigateLightbox(-1); // Swipe right -> prev
        }
      } else if (diffY > 80 && absDiffY > absDiffX * 1.5) {
        // Swipe down to dismiss
        closeLightbox();
      }
    }
  }

  function openLightbox(index) {
    lightboxIndex = index;
    const mem = filteredMemories[index];
    if (!mem) return;

    const overlay = $('#lightbox-overlay');
    const img = $('#lightbox-img');
    const year = $('#lightbox-year');
    const title = $('#lightbox-title');
    const desc = $('#lightbox-desc');
    const era = $('#lightbox-era');
    const age = $('#lightbox-age');
    const chapter = $('#lightbox-chapter');

    if (img) { img.src = mem.image; img.alt = mem.title; }
    if (year) year.textContent = `${mem.year} · ${getMonthName(mem.month)}`;
    if (title) title.textContent = mem.title;
    if (desc) desc.textContent = mem.description;
    if (era) era.textContent = mem.eraLabel;
    if (age) age.textContent = `${ageAtDate(mem.year, mem.month)} years old`;
    if (chapter) chapter.textContent = `${index + 1} of ${filteredMemories.length}`;

    // Update download button
    const downloadBtn = $('#lightbox-download');
    if (downloadBtn) {
      downloadBtn.href = mem.image;
      const cleanTitle = mem.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
      downloadBtn.download = `${mem.year}_${cleanTitle}.jpg`;
    }

    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update nav button visibility
    updateLightboxNav();
  }

  function closeLightbox() {
    const overlay = $('#lightbox-overlay');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
    lightboxIndex = -1;
  }

  function navigateLightbox(direction) {
    const newIndex = lightboxIndex + direction;
    if (newIndex < 0 || newIndex >= filteredMemories.length) return;
    openLightbox(newIndex);
  }

  function updateLightboxNav() {
    const prevBtn = $('#lightbox-prev');
    const nextBtn = $('#lightbox-next');
    if (prevBtn) prevBtn.style.display = lightboxIndex <= 0 ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = lightboxIndex >= filteredMemories.length - 1 ? 'none' : 'flex';
  }

  // ── Search ──

  function setupSearch() {
    const input = $('#search-input');
    const clearBtn = $('#search-clear');

    if (!input) return;

    const debouncedSearch = debounce((query) => performSearch(query), 200);

    input.addEventListener('input', () => {
      const query = input.value.trim();
      clearBtn?.classList.toggle('visible', query.length > 0);
      debouncedSearch(query);
    });

    clearBtn?.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.remove('visible');
      performSearch('');
      input.focus();
    });
  }

  function performSearch(query) {
    const resultsCount = $('#search-results-count');

    if (!query) {
      filteredMemories = [...MEMORIES];
      if (resultsCount) resultsCount.textContent = '';
      $$('.year-nav-btn').forEach(b => b.classList.remove('active'));
    } else {
      const q = query.toLowerCase();
      filteredMemories = MEMORIES.filter(mem => {
        return (
          mem.title.toLowerCase().includes(q) ||
          mem.description.toLowerCase().includes(q) ||
          mem.year.toString().includes(q) ||
          mem.era.toLowerCase().includes(q) ||
          mem.eraLabel.toLowerCase().includes(q) ||
          (mem.tags && mem.tags.some(t => t.toLowerCase().includes(q)))
        );
      });

      if (resultsCount) {
        if (filteredMemories.length > 0) {
          resultsCount.innerHTML = `Found <span>${filteredMemories.length}</span> ${filteredMemories.length === 1 ? 'memory' : 'memories'} matching "${escapeHtml(query)}"`;
        } else {
          resultsCount.textContent = '';
        }
      }
    }

    // Re-render active view
    if (currentView === 'booth') {
      renderTimeline();
    } else {
      renderGrid();
    }

    showNoResults(filteredMemories.length === 0 && query);

    if (filteredMemories.length === 0 && query) {
      const desc = $('#no-results-desc');
      if (desc) desc.textContent = `No memories found for "${query}". Try a year (e.g. 2019) or era (e.g. childhood).`;
    }
  }

  function showNoResults(show) {
    const el = $('#no-results');
    if (el) el.style.display = show ? 'flex' : 'none';

    // Hide appropriate view
    if (currentView === 'booth') {
      const booth = $('#booth-view');
      if (booth) booth.style.display = show ? 'none' : 'block';
    } else {
      const grid = $('#grid-view');
      if (grid) grid.style.display = show ? 'none' : 'block';
    }
  }

  // ── View Toggle ──

  function setupViewToggle() {
    const boothBtn = $('#view-booth-btn');
    const gridBtn = $('#view-grid-btn');

    boothBtn?.addEventListener('click', () => switchView('booth'));
    gridBtn?.addEventListener('click', () => switchView('grid'));
  }

  function switchView(view) {
    currentView = view;
    const boothView = $('#booth-view');
    const gridView = $('#grid-view');
    const boothBtn = $('#view-booth-btn');
    const gridBtn = $('#view-grid-btn');

    if (view === 'booth') {
      if (boothView) boothView.style.display = 'block';
      if (gridView) gridView.style.display = 'none';
      boothBtn?.classList.add('active');
      gridBtn?.classList.remove('active');
      renderTimeline();
    } else {
      if (boothView) boothView.style.display = 'none';
      if (gridView) gridView.style.display = 'block';
      boothBtn?.classList.remove('active');
      gridBtn?.classList.add('active');
      renderGrid();
    }
  }

  // ── Navigation ──

  function setupNavigation() {
    // Section navigation
    $$('.nav-link[data-section]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sectionId = btn.dataset.section;
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          $$('.nav-link').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Close mobile menu
          $('#nav-links')?.classList.remove('open');
        }
      });
    });

    // Mobile menu toggle
    $('#mobile-menu-btn')?.addEventListener('click', () => {
      $('#nav-links')?.classList.toggle('open');
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        $('#nav-links')?.classList.remove('open');
      }
    });

    // Hide/show navbar on scroll
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const navbar = $('#navbar');

      if (currentScrollY > lastScrollY && currentScrollY > 200 && !navHidden) {
        navbar?.classList.add('hidden');
        navHidden = true;
      } else if (currentScrollY < lastScrollY && navHidden) {
        navbar?.classList.remove('hidden');
        navHidden = false;
      }

      lastScrollY = currentScrollY;

      // Update active nav link based on scroll position
      updateActiveNavLink();
    }, { passive: true });

    // Scroll CTA
    $('#scroll-cta')?.addEventListener('click', () => {
      const booth = document.getElementById('booth');
      booth?.scrollIntoView({ behavior: 'smooth' });
    });

    // Brand click
    $('#nav-brand')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function updateActiveNavLink() {
    const sections = ['hero', 'booth', 'gallery'];
    const scrollY = window.scrollY + 200;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollY) {
        $$('.nav-link').forEach(b => b.classList.remove('active'));
        const link = $(`.nav-link[data-section="${sections[i]}"]`);
        link?.classList.add('active');
        break;
      }
    }
  }

  // ── Surprise Me FAB ──

  function setupSurpriseMe() {
    const fab = $('#surprise-fab');
    if (!fab) return;

    window.addEventListener('scroll', () => {
      fab.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    fab.addEventListener('click', () => {
      if (MEMORIES.length === 0) return;
      const randomIndex = Math.floor(Math.random() * MEMORIES.length);
      filteredMemories = [...MEMORIES];
      openLightbox(randomIndex);
    });
  }

  // ── Scroll to Top ──

  function setupScrollToTop() {
    const btn = $('#scroll-top-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
  }

  // ── Intersection Observer (Reveal Animations) ──

  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    $$('.reveal').forEach(el => {
      if (!el.classList.contains('revealed')) {
        observer.observe(el);
      }
    });
  }

  // ── Keyboard Navigation ──

  function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Lightbox navigation
      const overlay = $('#lightbox-overlay');
      if (overlay?.classList.contains('active')) {
        switch (e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            navigateLightbox(-1);
            break;
          case 'ArrowRight':
            navigateLightbox(1);
            break;
        }
        return;
      }

      // Timeline navigation (booth view)
      if (currentView === 'booth') {
        const viewport = $('#timeline-viewport');
        if (document.activeElement?.tagName === 'INPUT') return;

        switch (e.key) {
          case 'ArrowLeft':
            viewport?.scrollBy({ left: -300, behavior: 'smooth' });
            break;
          case 'ArrowRight':
            viewport?.scrollBy({ left: 300, behavior: 'smooth' });
            break;
        }
      }

      // Search shortcut
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const input = $('#search-input');
        if (input) {
          input.focus();
          input.select();
        }
      }
    });
  }

  // ── Launch ──

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for programmatic access and testing
  window.__timeBooth = { openLightbox, closeLightbox, navigateLightbox };

})();
