import { renderIcons } from '../utils/icons';
import { showToast } from '../utils/toast';
import { formatContactValue, renderCountryOptions, validateContactInput } from '../utils/phoneUtils';

export function openHireMeModal(): void {
  const backdrop = document.getElementById('project-modal');
  const windowEl = document.getElementById('modal-window');
  if (!backdrop || !windowEl) return;

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
        GOLDEN VISA HOLDER &bull; OPEN TO PARTNERSHIPS
      </span>
    </div>
    <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem;">Hire Me / Book a Call</h3>
    <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1.25rem;">
      Share your company and project details below to book a discovery call or start partnership scoping.
    </p>

    <form id="hire-form" style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
        <div class="form-group">
          <label for="hire-company">Company / Organization Name <span style="color: var(--accent-pink);">*</span></label>
          <input type="text" id="hire-company" placeholder="e.g. Acme Tech Solutions" required />
        </div>
        <div class="form-group">
          <label for="hire-title">Your Role / Project <span style="color: var(--accent-pink);">*</span></label>
          <input type="text" id="hire-title" placeholder="e.g. CTO · New SaaS platform" required />
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
        <div class="form-group">
          <label for="hire-datetime">Proposed Call Date &amp; Time <span style="color: var(--accent-pink);">*</span></label>
          <input type="datetime-local" id="hire-datetime" required />
        </div>
        <div class="form-group">
          <label for="hire-contact-method">Preferred Contact Method <span style="color: var(--accent-pink);">*</span></label>
          <select id="hire-contact-method">
            <option value="whatsapp" selected>WhatsApp / Mobile phone</option>
            <option value="email">Email address</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label id="hire-contact-label" for="hire-email">Phone Number / WhatsApp <span style="color: var(--accent-pink);">*</span></label>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <select id="hire-country-code" style="background: var(--bg-main); border: 1px solid var(--border-muted); color: var(--text-primary); padding: 0.65rem 0.5rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.85rem; width: 135px;" aria-label="Country Dialing Code">
            ${renderCountryOptions('+971')}
          </select>
          <input type="text" id="hire-email" placeholder="e.g. 0554276817 or 0501234567" required style="flex: 1;" />
        </div>
      </div>

      <div class="form-group">
        <label for="hire-work-model">Engagement Type / Work Model</label>
        <select id="hire-work-model">
          <option value="Technology Partnership">Technology Partnership / Joint Venture</option>
          <option value="Architecture Engagement">Architecture Engagement (Project / Audit)</option>
          <option value="Full-Time (UAE On-Site / Hybrid)">Full-Time (Abu Dhabi / UAE Hybrid or On-Site)</option>
          <option value="Full-Time (Remote)">Full-Time (Remote)</option>
          <option value="Part-time / Technical Consultant">Part-Time / Technical Consulting</option>
        </select>
      </div>

      <div class="form-group">
        <label for="hire-notes">Project Notes / Meeting Link</label>
        <textarea id="hire-notes" placeholder="Include Teams/Zoom link or a short brief of what you want to build..." rows="3"></textarea>
      </div>

      <div id="hire-status" class="form-status"></div>

      <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem;">
        <button type="button" class="btn btn-secondary btn-sm" id="hire-cancel-btn">Cancel</button>
        <button type="submit" class="btn btn-primary btn-sm">
          <span>Book the Call</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  `;

  renderIcons(windowEl);
  backdrop.classList.add('active');

  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('hire-cancel-btn');
  closeBtn?.addEventListener('click', () => backdrop.classList.remove('active'));
  cancelBtn?.addEventListener('click', () => backdrop.classList.remove('active'));

  const hireForm = document.getElementById('hire-form') as HTMLFormElement | null;
  const hireStatus = document.getElementById('hire-status');
  const methodSelect = document.getElementById('hire-contact-method') as HTMLSelectElement | null;
  const countryCodeSelect = document.getElementById('hire-country-code') as HTMLSelectElement | null;
  const contactInput = document.getElementById('hire-email') as HTMLInputElement | null;
  const labelEl = document.getElementById('hire-contact-label') as HTMLLabelElement | null;

  const clearStatus = () => {
    if (hireStatus) {
      hireStatus.innerHTML = '';
      hireStatus.className = 'form-status';
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
        contactInput.placeholder = isWhatsapp ? 'e.g. 0554276817 or 0501234567' : 'e.g. hr@company.com';
      }
      if (labelEl) {
        labelEl.innerHTML = isWhatsapp 
          ? 'Phone Number / WhatsApp <span style="color: var(--accent-pink);">*</span>'
          : 'Email Address <span style="color: var(--accent-pink);">*</span>';
      }
    });
  }

  if (contactInput) {
    contactInput.addEventListener('input', clearStatus);
  }

  if (hireForm) {
    hireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = (document.getElementById('hire-company') as HTMLInputElement)?.value.trim();
      const title = (document.getElementById('hire-title') as HTMLInputElement)?.value.trim();
      const datetime = (document.getElementById('hire-datetime') as HTMLInputElement)?.value;
      const rawContact = contactInput?.value.trim() || '';
      const countryCode = countryCodeSelect?.value || '+971';
      const selectedMethod = methodSelect?.value || 'whatsapp';

      if (!company || !title || !datetime || !rawContact) {
        if (hireStatus) {
          hireStatus.className = 'form-status error';
          hireStatus.textContent = 'Please fill in all mandatory fields.';
        }
        return;
      }

      const contactValidation = validateContactInput(rawContact, selectedMethod);
      if (!contactValidation.isValid) {
        if (hireStatus) {
          hireStatus.className = 'form-status error';
          hireStatus.textContent = contactValidation.errorMessage;
        }
        return;
      }

      const contactInfo = formatContactValue(rawContact, countryCode);
      const isPhoneMode = selectedMethod === 'whatsapp' && !rawContact.includes('@');

      if (hireStatus) {
        hireStatus.className = 'form-status success';
        hireStatus.textContent = 'Preparing your call request...';
      }

      const notes = (document.getElementById('hire-notes') as HTMLTextAreaElement)?.value.trim() || '';
      const workModel = (document.getElementById('hire-work-model') as HTMLSelectElement)?.value || 'Technology Partnership';

      const emailSubject = `Partnership Call Request: ${company} (${title})`;
      const messageBody = `Hello Joudi,

We would like to book a call to discuss a partnership:

Company: ${company}
Role / Project: ${title}
Work Model: ${workModel}
Proposed Date & Time: ${datetime}
Contact (${isPhoneMode ? 'Phone' : 'Email'}): ${contactInfo.formatted}

Additional Notes:
${notes || 'No additional notes provided.'}`;

      const whatsappNumber = '971554276817';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageBody)}`;
      const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=joudi.adeeb@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageBody)}`;
      const mailtoUrl = `mailto:joudi.adeeb@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageBody)}`;

      let actionButtonsHtml = '';
      if (isPhoneMode) {
        actionButtonsHtml = `
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-pink">
            <i data-lucide="message-circle"></i> Send via WhatsApp (${contactInfo.formatted})
          </a>
        `;
      } else {
        actionButtonsHtml = `
          <a href="${gmailWebUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            <i data-lucide="mail"></i> Send via Gmail Web
          </a>
          <a href="${mailtoUrl}" class="btn btn-outline">
            <i data-lucide="send"></i> Default Email App
          </a>
        `;
      }

      showToast(`Call request prepared for ${company}`);
      if (hireStatus) {
        hireStatus.className = 'form-status success';
        hireStatus.innerHTML = `
          <div style="padding: 1rem; background: var(--accent-pink-glow); border: 1px solid var(--accent-pink-border); border-radius: var(--radius-md); text-align: left; margin-top: 0.5rem;">
            <p style="margin-bottom: 0.4rem; font-weight: 700; color: var(--text-primary); font-size: 1rem;">✓ Call request created!</p>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.85rem; line-height: 1.4;">
              ${isPhoneMode ? 'Click below to launch WhatsApp and send your request:' : 'Click below to send your request via Email:'}
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
              ${actionButtonsHtml}
            </div>
          </div>
        `;
        renderIcons(hireStatus);
      }
    });
  }
}
