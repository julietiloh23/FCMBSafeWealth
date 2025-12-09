// Screen management
function showScreen(name){
  const screenMap = {
    home: 'homeScreen',
    fx: 'fxScreen',
    invest: 'investScreen',
    spend: 'spendScreen',
    fraud: 'fraudScreen'
  };
  
  // Hide all screens
  Object.values(screenMap).forEach(id => {
    const screen = document.getElementById(id);
    if (screen) {
      screen.style.display = 'none';
    }
  });
  
  // Show selected screen
  const screenId = screenMap[name] || 'homeScreen';
  const selectedScreen = document.getElementById(screenId);
  if (selectedScreen) {
    selectedScreen.style.display = 'block';
  }
  
  // Update navigation active state
  const navIcons = document.querySelectorAll('.nav .icon');
  navIcons.forEach(el => el.classList.remove('active'));
  
  // Set active based on screen
  const navMap = {
    home: 'nav-home',
    invest: 'nav-invest',
    spend: 'nav-spend',
    fraud: 'nav-fraud'
  };
  
  const activeNavId = navMap[name];
  if (activeNavId) {
    const activeNav = document.getElementById(activeNavId);
    if (activeNav) {
      activeNav.classList.add('active');
    }
  } else {
    // Default to home if no match
    document.getElementById('nav-home').classList.add('active');
  }
  
  // Update title
  const titleElement = document.getElementById('title');
  if (titleElement) {
    const titles = {
      home: 'SafeWealth',
      fx: 'FX Converter',
      invest: 'Investments',
      spend: 'Spending',
      fraud: 'Fraud Shield'
    };
    titleElement.textContent = titles[name] || 'SafeWealth';
  }
  
  // Update URL without reloading (for better UX)
  updateURLParameter('screen', name);
}

// Function to update URL parameter without reloading
function updateURLParameter(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

// Function to check URL parameters on load
function checkURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const screen = urlParams.get('screen');
  
  // Validate and show screen if valid
  const validScreens = ['home', 'fx', 'invest', 'spend', 'fraud'];
  if (screen && validScreens.includes(screen)) {
    showScreen(screen);
    return true;
  }
  return false;
}

// Navigation functions - MODIFIED
function prev(){
  // Navigate back to first app's home page
  window.location.href = "https://julietiloh23.github.io/safeWealth/";
}

function openHelp(){
  // Show help with option to go back to first app
  const userChoice = confirm(
    'This is a demo prototype of SafeWealth features (FX, Spending, Fraud Shield, Investments).\n\nIn a real app, this would open a help center or tutorial.\n\nClick OK to go back to the main dashboard.'
  );
  
  if (userChoice) {
    // If user clicks OK, go back to first app
    window.location.href = "https://julietiloh23.github.io/safeWealth/";
  }
}

// Touch event improvements for mobile
document.addEventListener('DOMContentLoaded', function() {
  // Add touch feedback to interactive elements
  const interactiveElements = document.querySelectorAll('.icon, .action-icon, .invest-item, .header-btn');
  
  interactiveElements.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });
    
    element.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    });
    
    element.addEventListener('touchcancel', function() {
      this.classList.remove('touch-active');
    });
  });
  
  // Prevent zoom on double tap
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Initialize: Check URL params first, default to home if none
  if (!checkURLParams()) {
    showScreen('home');
  }
  
  // Listen for browser back/forward button clicks
  window.addEventListener('popstate', function() {
    checkURLParams();
  });
});

// Optional: If you want to handle direct navigation from external links
// This ensures the navigation works even when coming from external sites
window.onload = function() {
  // Force a check on load to handle direct linking alright
  checkURLParams();
};