import { showToast, escapeHtml } from '../utils/toast';
import { formatContactValue, renderCountryOptions, validateContactInput } from '../utils/phoneUtils';

export const SERVICES_LIST: Record<string, { id: string; title: string; subtitle: string }> = {
  backend_api: {
    id: 'backend_api',
    title: 'Backend API Architecture (.NET 10)',
    subtitle: 'High-performance C# .NET REST APIs, Clean N-Tier, Microservices & JWT Authentication'
  },
  web_security: {
    id: 'web_security',
    title: 'Web Security & API Audits',
    subtitle: 'Offensive penetration testing, OWASP Top 10 auditing, IDOR patching & security reports'
  },
  database_tuning: {
    id: 'database_tuning',
    title: 'Database Design & T-SQL Tuning',
    subtitle: 'Relational schemas, Row-Level tenant isolation, ADO.NET optimization & execution plan tuning'
  },
  fullstack_app: {
    id: 'fullstack_app',
    title: 'Full-Stack Web Application Development',
    subtitle: 'End-to-end web applications with modern frontend, secure C# backend & optimized database'
  },
  consultation: {
    id: 'consultation',
    title: 'Technical Consultation & Code Review',
    subtitle: 'One-on-one architecture review, database optimization advice & security consulting'
  }
};

export function openServiceModal(serviceId: string): void {
  const backdrop = document.getElementById('project-modal');
  const windowEl = document.getElementById('modal-window');
  if (!backdrop || !windowEl) return;

  const service = SERVICES_LIST[serviceId] || {
    id: 'general',
    title: 'Custom Engineering Service',
    subtitle: 'Direct consultation or custom software solution'
  };

  windowEl.innerHTML = `
    <button class="modal-close" id="modal-close-btn" aria-label="Close modal">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div style="margin-bottom: 0.75rem;">
      <span class="status-pill">
        <span class="status-dot"></span>
        DIRECT SERVICE REQUEST
      </span>
    </div>
    <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem;">Request Service: ${escapeHtml(service.title)}</h3>
    <p style="color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.875rem; margin-bottom: 1.25rem;">
      ${escapeHtml(service.subtitle)}
    </p>

    <form id="service-request-form" style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="form-group">
        <label for="service-client-name">Your Name <span style="color: var(--accent-emerald);">*</span></label>
        <input type="text" id="service-client-name" placeholder="e.g. Ahmad Al-Mansoori" required />
      </div>

      <div class="form-group">
        <label for="service-contact-method">Preferred Contact Method <span style="color: var(--accent-emerald);">*</span></label>
        <select id="service-contact-method" style="margin-bottom: 0.5rem;">
          <option value="whatsapp" selected>💬 WhatsApp / Mobile Phone</option>
          <option value="email">✉️ Email Address</option>
        </select>
      </div>

      <div class="form-group">
        <label id="service-contact-label" for="service-contact-info">Phone Number / WhatsApp <span style="color: var(--accent-emerald);">*</span></label>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <select id="service-country-code" style="background: var(--bg-main); border: 1px solid var(--border-muted); color: var(--text-primary); padding: 0.65rem 0.5rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.85rem; width: 135px;" aria-label="Country Dialing Code">
            ${renderCountryOptions('+971')}
          </select>
          <input type="text" id="service-contact-info" placeholder="e.g. 0554276817 or 0501234567" required style="flex: 1;" />
        </div>
      </div>

      <div class="form-group">
        <label for="service-select">Selected Service</label>
        <select id="service-select">
          ${Object.values(SERVICES_LIST).map(s => `
            <option value="${s.id}" ${s.id === service.id ? 'selected' : ''}>${escapeHtml(s.title)}</option>
          `).join('')}
        </select>
      </div>

      <div class="form-group">
        <label for="service-details">Project Overview (Optional)</label>
        <textarea id="service-details" placeholder="Provide a brief overview of your project requirements or scope..." rows="3"></textarea>
      </div>

      <div id="service-status" class="form-status"></div>

      <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem;">
        <button type="button" class="btn btn-secondary btn-sm" id="service-cancel-btn">Cancel</button>
        <button type="submit" class="btn btn-emerald btn-sm" style="font-weight: 700;">
          <span>Submit Service Request</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  `;

  backdrop.classList.add('active');

  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('service-cancel-btn');
  closeBtn?.addEventListener('click', () => backdrop.classList.remove('active'));
  cancelBtn?.addEventListener('click', () => backdrop.classList.remove('active'));

  const form = document.getElementById('service-request-form') as HTMLFormElement | null;
  const statusEl = document.getElementById('service-status');
  const methodSelect = document.getElementById('service-contact-method') as HTMLSelectElement | null;
  const countryCodeSelect = document.getElementById('service-country-code') as HTMLSelectElement | null;
  const contactInput = document.getElementById('service-contact-info') as HTMLInputElement | null;
  const labelEl = document.getElementById('service-contact-label') as HTMLLabelElement | null;

  const clearStatus = () => {
    if (statusEl) {
      statusEl.innerHTML = '';
      statusEl.className = 'form-status';
    }
  };

  if (methodSelect) {
    methodSelect.addEventListener('change', () => {
      clearStatus();
      const isWhatsapp = methodSelect.value === 'whatsapp';
      if (countryCodeSelect) {
        countryCodeSelect.style.display = isWhatsapp ? 'inline-block' : 'none';
      }
      if (contactInput) {
        contactInput.placeholder = isWhatsapp ? 'e.g. 0554276817 or 0501234567' : 'e.g. name@company.com';
      }
      if (labelEl) {
        labelEl.innerHTML = isWhatsapp 
          ? 'Phone Number / WhatsApp <span style="color: var(--accent-emerald);">*</span>'
          : 'Email Address <span style="color: var(--accent-emerald);">*</span>';
      }
    });
  }

  if (contactInput) {
    contactInput.addEventListener('input', clearStatus);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('service-client-name') as HTMLInputElement)?.value.trim();
      const rawContact = contactInput?.value.trim() || '';
      const countryCode = countryCodeSelect?.value || '+971';
      const selectedMethod = methodSelect?.value || 'whatsapp';
      const selectedId = (document.getElementById('service-select') as HTMLSelectElement)?.value;
      const details = (document.getElementById('service-details') as HTMLTextAreaElement)?.value.trim();

      if (!name || !rawContact) {
        if (statusEl) {
          statusEl.className = 'form-status error';
          statusEl.textContent = '❌ Please enter your name and contact info.';
        }
        return;
      }

      const contactValidation = validateContactInput(rawContact, selectedMethod);
      if (!contactValidation.isValid) {
        if (statusEl) {
          statusEl.className = 'form-status error';
          statusEl.textContent = contactValidation.errorMessage;
        }
        return;
      }

      const contactInfo = formatContactValue(rawContact, countryCode);
      const isPhoneMode = selectedMethod === 'whatsapp' && !rawContact.includes('@');
      const selectedService = SERVICES_LIST[selectedId] || service;

      if (statusEl) {
        statusEl.className = 'form-status success';
        statusEl.textContent = '⏳ Preparing service request dispatch...';
      }

      const emailSubject = `Service Request: ${selectedService.title} - ${name}`;
      const messageBody = `Hello Joudi,

I would like to request the following engineering service:
Service: ${selectedService.title}

Client Name: ${name}
Contact (${isPhoneMode ? 'Phone' : 'Email'}): ${contactInfo.formatted}

Project Overview:
${details || 'No additional details provided.'}`;

      const whatsappNumber = '971554276817';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageBody)}`;
      const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jan.adeeb000@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageBody)}`;
      const mailtoUrl = `mailto:jan.adeeb000@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageBody)}`;

      let actionButtonsHtml = '';
      if (isPhoneMode) {
        actionButtonsHtml = `
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="background: #25D366; color: #000000; font-weight: 700; padding: 0.75rem 1.25rem; border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35); font-size: 0.9rem;">
            <span>💬</span> Send via WhatsApp (${contactInfo.formatted})
          </a>
        `;
      } else {
        actionButtonsHtml = `
          <a href="${gmailWebUrl}" target="_blank" rel="noopener noreferrer" style="background: #EA4335; color: #FFFFFF; font-weight: 700; padding: 0.75rem 1.25rem; border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; box-shadow: 0 4px 14px rgba(234, 67, 53, 0.35); font-size: 0.9rem;">
            <span>✉️</span> Send via Gmail Web
          </a>
          <a href="${mailtoUrl}" style="background: rgba(255, 255, 255, 0.12); color: var(--text-primary); border: 1px solid var(--border-muted); font-weight: 600; padding: 0.75rem 1.25rem; border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; font-size: 0.9rem;">
            <span>📧</span> Default Email App
          </a>
        `;
      }

      showToast(`Service request prepared for ${selectedService.title}`);
      if (statusEl) {
        statusEl.className = 'form-status success';
        statusEl.innerHTML = `
          <div style="padding: 1rem; background: rgba(16, 185, 129, 0.12); border: 1.5px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md); text-align: left; margin-top: 0.5rem;">
            <p style="margin-bottom: 0.4rem; font-weight: 700; color: #10B981; font-size: 1rem;">✓ Service request created!</p>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.85rem; line-height: 1.4;">
              ${isPhoneMode ? 'Click below to launch WhatsApp and send your request:' : 'Click below to dispatch your request via Email:'}
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
              ${actionButtonsHtml}
            </div>
          </div>
        `;
      }
    });
  }
}
