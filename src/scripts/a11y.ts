// Focus outline handler
export function handleFocusOutline() {
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-user');
    }
  });

  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-user');
  });
}

// Skip to main content
export function initializeSkipToMain() {
  const skipLink = document.getElementById('skip-to-main');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.querySelector('main');
      if (main) {
        main.tabIndex = -1;
        main.focus();
        main.addEventListener('blur', () => {
          main.removeAttribute('tabindex');
        }, { once: true });
      }
    });
  }
}

// ARIA announcer for dynamic content
export class AriaAnnouncer {
  private static instance: AriaAnnouncer;
  private announcer: HTMLDivElement;

  private constructor() {
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.classList.add('sr-only');
    document.body.appendChild(this.announcer);
  }

  public static getInstance(): AriaAnnouncer {
    if (!AriaAnnouncer.instance) {
      AriaAnnouncer.instance = new AriaAnnouncer();
    }
    return AriaAnnouncer.instance;
  }

  public announce(message: string): void {
    this.announcer.textContent = '';
    // Force a DOM reflow
    void this.announcer.offsetWidth;
    this.announcer.textContent = message;
  }
}

// Initialize all accessibility features
export function initializeA11y(): void {
  handleFocusOutline();
  initializeSkipToMain();
  AriaAnnouncer.getInstance(); // Initialize the announcer
}