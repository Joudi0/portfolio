import './index.css';
import { copyEmail } from './utils/toast';
import { renderIcons } from './utils/icons';
import { openProjectModal } from './components/projectModal';
import { openHireMeModal } from './components/hireModal';
import { openServiceModal } from './components/serviceModal';
import { testApiEndpoint } from './components/apiTester';
import { setupContactForm } from './components/contactForm';

/**
 * Main Application Entry Point & Module Orchestration
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Swap <i data-lucide> placeholders for inline SVG icons
  renderIcons();

  // 2. Mobile Sidebar Drawer (toggle, overlay, Esc, scroll lock)
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  const setDrawer = (open: boolean) => {
    if (!toggleBtn || !sidebar) return;
    toggleBtn.setAttribute('aria-expanded', open.toString());
    toggleBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    sidebar.classList.toggle('active', open);
    overlay?.classList.toggle('active', open);
    document.body.classList.toggle('no-scroll', open);
    if (open) sidebar.querySelector<HTMLAnchorElement>('a')?.focus();
  };

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      setDrawer(toggleBtn.getAttribute('aria-expanded') !== 'true');
    });
    overlay?.addEventListener('click', () => setDrawer(false));

    // Close drawer when picking a destination on mobile
    sidebar.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => setDrawer(false));
    });
  }

  // 3. Sidebar scroll-spy: highlight the section currently in view
  const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>('.sidebar-menu-link');
  const linkById = new Map<string, HTMLAnchorElement>();
  sidebarLinks.forEach(link => {
    const id = link.getAttribute('href')?.slice(1);
    if (id) linkById.set(id, link);
  });

  const setActiveLink = (id: string) => {
    const link = linkById.get(id);
    if (!link) return;
    sidebarLinks.forEach(l => {
      l.classList.remove('active');
      l.removeAttribute('aria-current');
    });
    link.classList.add('active');
    link.setAttribute('aria-current', 'location');
  };

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    linkById.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  // 4. Subtle reveal-on-scroll (skipped when the user prefers reduced motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-ready');
    const revealer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => revealer.observe(el));
  }

  // 5. Attach Copy Email Click Listeners
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => copyEmail());
  });

  // 6. Attach Project Modal Inspection Listeners
  document.querySelectorAll<HTMLButtonElement>('button[data-project-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      if (projectId) openProjectModal(projectId);
    });
  });

  // 7. Attach Service Request Modal Listeners
  document.querySelectorAll<HTMLButtonElement>('.service-request-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceId = btn.getAttribute('data-service-id');
      if (serviceId) openServiceModal(serviceId);
    });
  });

  // 8. Setup Hire Me Header, Hero & Sidebar Profile Modal Listeners
  ['hire-me-header-btn', 'hire-me-hero-btn', 'hire-me-sidebar-btn'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => openHireMeModal());
  });

  // 9. Modal accessibility: sync aria-hidden, move focus in, restore it on close
  const modalBackdrop = document.getElementById('project-modal');
  const modalWindow = document.getElementById('modal-window');
  if (modalBackdrop) {
    let lastFocused: HTMLElement | null = null;
    new MutationObserver(() => {
      const isOpen = modalBackdrop.classList.contains('active');
      if (isOpen === (modalBackdrop.getAttribute('aria-hidden') === 'false')) return;
      modalBackdrop.setAttribute('aria-hidden', (!isOpen).toString());
      document.body.classList.toggle('no-scroll', isOpen);
      if (isOpen) {
        lastFocused = document.activeElement as HTMLElement | null;
        modalWindow?.querySelector<HTMLElement>('input, select, textarea, button:not(.modal-close)')?.focus();
      } else {
        lastFocused?.focus();
      }
    }).observe(modalBackdrop, { attributes: true, attributeFilter: ['class'] });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  // 10. Setup Live API Tester Button
  document.getElementById('test-api-btn')?.addEventListener('click', () => {
    testApiEndpoint();
  });

  // 11. Setup Contact Form Handler
  setupContactForm();

  // 12. ESC Key closes the modal or the mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (modalBackdrop?.classList.contains('active')) {
      modalBackdrop.classList.remove('active');
    } else if (sidebar?.classList.contains('active')) {
      setDrawer(false);
      toggleBtn?.focus();
    }
  });
});

// Expose functions globally for inline handlers or console access
(window as unknown as Record<string, unknown>).copyEmail = copyEmail;
(window as unknown as Record<string, unknown>).openProjectModal = openProjectModal;
(window as unknown as Record<string, unknown>).openHireMeModal = openHireMeModal;
(window as unknown as Record<string, unknown>).openServiceModal = openServiceModal;
(window as unknown as Record<string, unknown>).testApiEndpoint = testApiEndpoint;
