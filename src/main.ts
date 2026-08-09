import './index.css';
import { copyEmail } from './utils/toast';
import { openProjectModal } from './components/projectModal';
import { openHireMeModal } from './components/hireModal';
import { openServiceModal } from './components/serviceModal';
import { testApiEndpoint } from './components/apiTester';
import { setupContactForm } from './components/contactForm';

/**
 * Main Application Entry Point & Module Orchestration
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Sidebar Toggle Setup
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', (!expanded).toString());
      sidebar.classList.toggle('active');
    });

    // Close sidebar menu when clicking a nav link on mobile
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.setAttribute('aria-expanded', 'false');
        sidebar.classList.remove('active');
      });
    });
  }

  // 2. Sidebar Link Active State Handler
  const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>('.sidebar-menu-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // 3. Dashboard Grid Toggle ("Show less" / "Show more")
  const dashToggle = document.querySelector<HTMLButtonElement>('.dashboard-toggle');
  const dashGrid = document.querySelector<HTMLElement>('.gumroad-grid');
  if (dashToggle && dashGrid) {
    let isCollapsed = false;
    dashToggle.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      if (isCollapsed) {
        dashGrid.style.display = 'none';
        dashToggle.textContent = 'Show more +';
      } else {
        dashGrid.style.display = 'grid';
        dashToggle.textContent = 'Show less ✕';
      }
    });
  }

  // 4. Attach Copy Email Click Listeners
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => copyEmail());
  });

  // 5. Attach Project Modal Inspection Listeners
  document.querySelectorAll<HTMLButtonElement>('button[data-project-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      if (projectId) openProjectModal(projectId);
    });
  });

  // 6. Attach Service Request Modal Listeners
  document.querySelectorAll<HTMLButtonElement>('.service-request-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceId = btn.getAttribute('data-service-id');
      if (serviceId) openServiceModal(serviceId);
    });
  });

  // 7. Setup Hire Me Header, Hero & Sidebar Profile Modal Listeners
  document.getElementById('hire-me-header-btn')?.addEventListener('click', () => {
    openHireMeModal();
  });
  document.getElementById('hire-me-hero-btn')?.addEventListener('click', () => {
    openHireMeModal();
  });
  document.getElementById('hire-me-sidebar-btn')?.addEventListener('click', () => {
    openHireMeModal();
  });

  // 8. Modal Backdrop click to close handler
  const modalBackdrop = document.getElementById('project-modal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  // 9. Setup Live API Tester Button
  document.getElementById('test-api-btn')?.addEventListener('click', () => {
    testApiEndpoint();
  });

  // 10. Setup Contact Form Handler
  setupContactForm();

  // 11. ESC Key Handler for Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrop?.classList.remove('active');
    }
  });
});

// Expose functions globally for inline handlers or console access
(window as unknown as Record<string, unknown>).copyEmail = copyEmail;
(window as unknown as Record<string, unknown>).openProjectModal = openProjectModal;
(window as unknown as Record<string, unknown>).openHireMeModal = openHireMeModal;
(window as unknown as Record<string, unknown>).openServiceModal = openServiceModal;
(window as unknown as Record<string, unknown>).testApiEndpoint = testApiEndpoint;
