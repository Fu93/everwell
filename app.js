/**
 * Everwell Landing Page Interactivity
 * Course: MGT4114 MVP
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Realistic subtle Heart Rate pulse simulation
  const hrElem = document.getElementById('liveHeartRate');
  if (hrElem) {
    let currentHR = 72;
    setInterval(() => {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.6 ? 1 : 0);
      currentHR = Math.max(69, Math.min(76, currentHR + delta));
      hrElem.textContent = currentHR;
    }, 2800);
  }

  // 3. Early Access Form Submission Handler
  const earlyAccessForm = document.getElementById('earlyAccessForm');
  const submissionSuccess = document.getElementById('submissionSuccess');
  const resetFormBtn = document.getElementById('resetFormBtn');

  if (earlyAccessForm && submissionSuccess) {
    earlyAccessForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName')?.value || 'Guest';
      const email = document.getElementById('userEmail')?.value || '';
      const role = document.getElementById('userRole')?.value || '';
      const location = document.getElementById('userLocation')?.value || '';

      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Securing Your Spot...</span>`;
        submitBtn.disabled = true;
      }

      // Simulate network submission
      setTimeout(() => {
        // Store in localStorage for demonstration
        const submissions = JSON.parse(localStorage.getItem('everwell_signups') || '[]');
        submissions.push({
          name,
          email,
          role,
          location,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('everwell_signups', JSON.stringify(submissions));

        // Switch to success view
        earlyAccessForm.style.display = 'none';
        submissionSuccess.style.display = 'block';

        if (submitBtn) {
          submitBtn.innerHTML = `<span>Join the Early Access List</span>`;
          submitBtn.disabled = false;
        }
      }, 700);
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        earlyAccessForm.reset();
        submissionSuccess.style.display = 'none';
        earlyAccessForm.style.display = 'flex';
      });
    }
  }

  // 4. Smooth Anchor Scrolling with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#terms' || targetId === '#privacy' || targetId === '#consent') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
