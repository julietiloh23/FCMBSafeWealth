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
}

// Navigation functions
function prev(){
  alert('Back (demo) - This would navigate back in a real app');
}

function openHelp(){
  alert('This is a demo prototype of SafeWealth features (FX, Spending, Fraud Shield, Investments).\n\nIn a real app, this would open a help center or tutorial.');
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
  
  // Initialize with home screen
  showScreen('home');
});