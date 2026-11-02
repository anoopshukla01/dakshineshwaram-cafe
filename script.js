/**
 * DAKSHINESHWARAM CAFÉ (दक्षिणेश्वरम कैफे) - Hub Interactions & Configuration
 * 
 * Edit any URL directly in the CONFIG object below.
 */

const CONFIG = {
  // Food Delivery & Services
  SWIGGY_URL: "https://www.swiggy.com/city/gorakhpur/dakshineswaram-cafe-golghar-rest1386978",
  ZOMATO_URL: "https://www.zomato.com/gorakhpur/dakshineswaram-kafe-kunraghat",
  WHATSAPP_URL: "https://wa.me/919565421321",
  GOOGLE_MAPS_URL: "https://www.google.com/maps/place/Dakshineswaram+Kafe+%7C%7C+Best+South+Indian+Cafe+In+Gorakhpur/@26.7496631,83.3954781,2331m/data=!3m1!1e3!4m6!3m5!1s0x3991457ccb166245:0x883754783fe6d76e!8m2!3d26.7496608!4d83.4016692!16s%2Fg%2F11z1sq5x2b?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D",
  WEBSITE_URL: "https://dakshineswaramkafe.com", // Replace with official website URL if desired
  GOOGLE_REVIEW_URL: "https://search.google.com/local/writereview?placeid=ChIJRWIWy3xFkTkRbtfmP3hUN4g&source=g.page.m.np._&laa=nmx-review-solicitation-promoted-recommendation-card",

  // Social Channels
  INSTAGRAM_URL: "https://www.instagram.com/dakshineswaramkafe_gkp/",
  FACEBOOK_URL: "https://www.facebook.com/DakshineswaramKafe.gkp/",
  YOUTUBE_URL: "https://www.youtube.com/@DakshineswaramKafe.gorakhpur",

  // Direct Contact
  PHONE_NUMBER: "+919565421321",
  PHONE_URL: "tel:+919565421321"
};

/**
 * Click Logger / Analytics Hook
 * Logs clicks to console and persists counts in localStorage.
 * Can be hooked up to Google Analytics 4, Meta Pixel, or a custom backend.
 */
function logClick(linkName) {
  try {
    const storageKey = 'dakshineshwaram_link_clicks';
    const existing = JSON.parse(localStorage.getItem(storageKey) || '{}');
    existing[linkName] = (existing[linkName] || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(existing));

    console.log(`[Dakshineshwaram Analytics] Click registered: "${linkName}" (Total: ${existing[linkName]})`);

    // Dispatch a custom event for any analytics listeners
    window.dispatchEvent(new CustomEvent('dakshineshwaram:click', {
      detail: { link: linkName, timestamp: Date.now(), count: existing[linkName] }
    }));
  } catch (err) {
    console.warn('[Dakshineshwaram Analytics] Unable to persist click count:', err);
  }
}

/**
 * Initialize URLs & Event Listeners
 */
function initLinkHub() {
  // Mapping of element IDs to CONFIG URLs
  const linkMappings = [
    { id: 'btnSwiggy', url: CONFIG.SWIGGY_URL, name: 'swiggy' },
    { id: 'btnZomato', url: CONFIG.ZOMATO_URL, name: 'zomato' },
    { id: 'btnWhatsapp', url: CONFIG.WHATSAPP_URL, name: 'whatsapp' },
    { id: 'btnMaps', url: CONFIG.GOOGLE_MAPS_URL, name: 'google_maps' },
    { id: 'btnWebsite', url: CONFIG.WEBSITE_URL, name: 'website' },
    { id: 'btnReview', url: CONFIG.GOOGLE_REVIEW_URL, name: 'google_review' },
    { id: 'btnInstagram', url: CONFIG.INSTAGRAM_URL, name: 'instagram' },
    { id: 'btnFacebook', url: CONFIG.FACEBOOK_URL, name: 'facebook' },
    { id: 'btnYoutube', url: CONFIG.YOUTUBE_URL, name: 'youtube' },
    { id: 'footerAddress', url: CONFIG.GOOGLE_MAPS_URL, name: 'footer_map' },
    { id: 'footerPhone', url: CONFIG.PHONE_URL, name: 'footer_phone' }
  ];

  // Apply URLs and click handlers
  linkMappings.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.href = item.url;

      el.addEventListener('click', () => {
        logClick(item.name);
      });
    }
  });

  // Staggered Entrance Highlight for Grid Buttons
  const buttons = document.querySelectorAll('.graphic-link-btn, .interactive-btn, .notched-btn, .link-btn');
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.classList.add('animate-in');
    }, 120 + index * 90);
  });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLinkHub);
} else {
  initLinkHub();
}

