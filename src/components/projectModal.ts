import { PROJECTS_DATA } from '../data/projects';
import { escapeHtml } from '../utils/toast';

export function openProjectModal(projectId: string): void {
  const project = PROJECTS_DATA[projectId];
  if (!project) return;
  
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
    <div style="margin-bottom: 1rem;">
      <span class="status-pill">Architectural Deep Dive</span>
      ${project.isPrivate ? '<span class="badge" style="margin-left: 0.5rem; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);">Proprietary / Closed Source</span>' : ''}
    </div>
    <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem;">${escapeHtml(project.title)}</h3>
    <p style="color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.875rem; margin-bottom: 1.25rem;">
      ${escapeHtml(project.subtitle)}
    </p>
    
    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">System Architecture &amp; Design Pattern</h4>
      <p style="font-size: 0.925rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${escapeHtml(project.architecture)}</p>
      
      ${project.designPatterns && project.designPatterns.length > 0 ? `
        <div style="margin-top: 0.5rem; margin-bottom: 0.75rem;">
          <strong style="color: var(--text-primary); font-size: 0.875rem;">Design Patterns Implemented:</strong>
          <ul style="list-style-type: none; padding-left: 0; margin-top: 0.25rem;">
            ${project.designPatterns.map(dp => `<li style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.25rem;">${escapeHtml(dp)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${project.dbSupport && project.dbSupport.length > 0 ? `
        <div style="margin-top: 0.5rem; margin-bottom: 0.75rem;">
          <strong style="color: var(--text-primary); font-size: 0.875rem;">Supported Database Engines:</strong>
          <ul style="list-style-type: none; padding-left: 0; margin-top: 0.25rem;">
            ${project.dbSupport.map(db => `<li style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.25rem;">${escapeHtml(db)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>

    ${project.classArchitecture && project.classArchitecture.length > 0 ? `
      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Class Architecture (20+ Modular Classes)</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.4rem;">
          ${project.classArchitecture.map(cls => `
            <div style="background: var(--bg-tertiary); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-secondary);">
              ⚙️ ${escapeHtml(cls)}
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${project.solutionStructure ? `
      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Generated .NET 10 Solution Structure (.slnx)</h4>
        <pre class="code-block" style="font-size: 0.8rem;"><code>${escapeHtml(project.solutionStructure)}</code></pre>
      </div>
    ` : ''}
    
    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Production C# / SQL Implementation Snippet</h4>
      <pre class="code-block"><code>${escapeHtml(project.codeSnippet)}</code></pre>
    </div>
    
    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Key Engineering Accomplishments</h4>
      <ul style="list-style-type: disc; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.925rem;">
        ${project.highlights.map(h => `<li style="margin-bottom: 0.4rem;">${escapeHtml(h)}</li>`).join('')}
      </ul>
    </div>
    
    <div style="background-color: var(--accent-emerald-glow); border: 1px solid var(--accent-emerald-border); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <strong style="color: var(--accent-emerald); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">🛡️ Security Audit Guarantee:</strong>
      <span style="font-size: 0.875rem; color: var(--text-secondary);">${escapeHtml(project.securityNote)}</span>
    </div>
    
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Scalar API Docs ↗</a>` : ''}
      ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Backend GitHub Repo ↗</a>` : ''}
      ${project.desktopRepoUrl ? `<a href="${project.desktopRepoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Desktop WinForms Repo ↗</a>` : ''}
      ${project.upworkUrl ? `<a href="${project.upworkUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="border-color: #14a800; color: #14a800;">Upwork Project Case Study ↗</a>` : ''}
      ${project.desktopUpworkUrl ? `<a href="${project.desktopUpworkUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="border-color: #14a800; color: #14a800;">Desktop Upwork Case Study ↗</a>` : ''}
      <button class="btn btn-secondary btn-sm" id="modal-close-window-btn">Close Window</button>
    </div>
  `;
  
  backdrop.classList.add('active');
  
  document.getElementById('modal-close-btn')?.addEventListener('click', () => {
    backdrop.classList.remove('active');
  });
  document.getElementById('modal-close-window-btn')?.addEventListener('click', () => {
    backdrop.classList.remove('active');
  });
}
