/**
 * Checks if the current session came from Google Ads
 * @returns {boolean} - True if the session originated from Google Ads
 */
const isFromGoogleAds = () => {
  // Check for gclid in URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("gclid");
};

/**
 * Tracks page view with timing
 */
export const trackPageView = () => {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      send_to: "AW-17012396077",
    });
  }
};

/**
 * Tracks user interaction with timing
 * @param {string} action - The action performed (e.g., 'button_click', 'form_start')
 * @param {string} label - The specific element interacted with
 */
export const trackUserAction = (action, label) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: "user_interaction",
      event_label: label,
      send_to: "AW-17012396077",
    });
  }
};

/**
 * Tracks time spent on page
 */
export const trackTimeSpent = () => {
  let startTime = Date.now();

  // Track when user leaves the page
  window.addEventListener("beforeunload", () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // Convert to seconds
    if (window.gtag) {
      window.gtag("event", "time_spent", {
        event_category: "engagement",
        event_label: "page_duration",
        value: timeSpent,
        send_to: "AW-17012396077",
      });
    }
  });
};

/**
 * Tracks a click conversion event (for pre-conversion tracking)
 * Only tracks if the session came from Google Ads
 * @param {string} [url] - Optional URL to navigate to after tracking
 * @returns {boolean} - Returns false to prevent default link behavior if needed
 */
export const trackClickConversion = (url) => {
  if (!isFromGoogleAds()) {
    return false;
  }

  if (window.gtag_report_conversion) {
    return window.gtag_report_conversion(url);
  }
  return false;
};

/**
 * Tracks a completed transaction conversion
 * Only tracks if the session came from Google Ads
 * @param {Object} params - Conversion parameters
 * @param {string} params.transactionId - Transaction ID
 * @param {number} params.value - Transaction value
 * @param {string} params.currency - Currency code (e.g., 'GBP')
 */
export const trackTransactionConversion = ({
  transactionId,
  value,
  currency,
}) => {
  // Only track if the session came from Google Ads
  if (!isFromGoogleAds()) {
    console.log("Not tracking conversion - session not from Google Ads");
    return;
  }

  if (window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-17012396077/PXouCIvj-ckaEK2gkrA_",
      transaction_id: transactionId,
      value: value,
      currency: currency,
      event_category: "transaction",
      event_label: "completed_payment",
    });
  }
};
