import { showToast } from '../utils/toast';
import { formatContactValue, validateContactInput } from '../utils/phoneUtils';

export function setupContactForm(): void {
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    const methodSelect = contactForm.querySelector<HTMLSelectElement>('#contact-method-select');
    const countryCodeSelect = contactForm.querySelector<HTMLSelectElement>('#sender-country-code');
    const emailInput = contactForm.querySelector<HTMLInputElement>('#sender-email');
    const labelEl = contactForm.querySelector<HTMLLabelElement>('#sender-contact-label');
    const hintEl = contactForm.querySelector<HTMLSpanElement>('#sender-contact-hint');

    // Clear stale status when user edits contact or switches method
    const clearStatus = () => {
      if (formStatus) {
        formStatus.innerHTML = '';
        formStatus.className = 'form-status';
      }
    };

    if (methodSelect) {
      methodSelect.addEventListener('change', () => {
        clearStatus();
        const isWhatsapp = methodSelect.value === 'whatsapp';
        if (countryCodeSelect) {
          countryCodeSelect.style.display = isWhatsapp ? 'inline-block' : 'none';
        }
        if (emailInput) {
          emailInput.placeholder = isWhatsapp ? 'e.g. 0554276817 or 0501234567' : 'e.g. sarah@company.com';
        }
        if (labelEl) {
          labelEl.innerHTML = isWhatsapp 
            ? 'Phone Number / WhatsApp <span style="color: var(--accent-pink);">*</span>'
            : 'Email Address <span style="color: var(--accent-pink);">*</span>';
        }
        if (hintEl) {
          hintEl.style.display = isWhatsapp ? 'block' : 'none';
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', clearStatus);
    }

    contactForm.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      
      const nameInput = contactForm.querySelector<HTMLInputElement>('#sender-name');
      const subjectSelect = contactForm.querySelector<HTMLSelectElement>('#inquiry-type');
      const messageTextarea = contactForm.querySelector<HTMLTextAreaElement>('#sender-message');
      
      const fullName = nameInput?.value.trim() || '';
      const rawContact = emailInput?.value.trim() || '';
      const selectedCode = countryCodeSelect?.value || '+971';
      const selectedMethod = methodSelect?.value || 'whatsapp';
      const inquiryType = subjectSelect?.value || 'General Inquiry';
      const message = messageTextarea?.value.trim() || '';

      if (!fullName || !rawContact || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = '❌ Please complete all required fields before submitting.';
        }
        return;
      }

      // Validate contact value against chosen method
      const contactValidation = validateContactInput(rawContact, selectedMethod);
      if (!contactValidation.isValid) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = contactValidation.errorMessage;
        }
        return;
      }

      // Format contact input & accurately determine if WhatsApp or Email mode
      const contactInfo = formatContactValue(rawContact, selectedCode);
      const isPhoneMode = selectedMethod === 'whatsapp' && !rawContact.includes('@');

      const emailSubject = `Inquiry: ${inquiryType} from ${fullName}`;
      const messageBody = `Hello Joudi,

Name: ${fullName}
Contact (${isPhoneMode ? 'Phone' : 'Email'}): ${contactInfo.formatted}
Inquiry Type: ${inquiryType}

Message:
${message}`;

      const whatsappNumber = '971554276817';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageBody)}`;
      const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jan.adeeb000@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageBody)}`;
      const mailtoUrl = `mailto:jan.adeeb000@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageBody)}`;

      if (formStatus) {
        formStatus.className = 'form-status success';
        
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

        formStatus.innerHTML = `
          <div style="padding: 1rem; background: rgba(16, 185, 129, 0.12); border: 1.5px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md); margin-top: 0.75rem;">
            <p style="margin-bottom: 0.4rem; font-weight: 700; color: #10B981; font-size: 1rem;">✓ Message ready to dispatch!</p>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.85rem; line-height: 1.4;">
              ${isPhoneMode ? 'Click below to launch WhatsApp and send your message:' : 'Click below to dispatch your message via Email:'}
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
              ${actionButtonsHtml}
            </div>
          </div>
        `;
      }

      showToast(`Message prepared for ${isPhoneMode ? 'WhatsApp' : 'Email'} delivery!`);
    });
  }
}


