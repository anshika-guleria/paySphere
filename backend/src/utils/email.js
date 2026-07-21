const axios = require("axios");

/**
 * Sends an email by proxying through the Vercel serverless function.
 *
 * Render blocks outbound SMTP (ports 25, 465, 587), so the backend
 * sends an HTTP POST to the Vercel-hosted frontend, which then
 * delivers the email via Gmail SMTP.
 *
 * If FRONTEND_URL is not configured or the proxy is unreachable,
 * the email is logged to the console as a local-dev fallback.
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const frontendUrl = process.env.FRONTEND_URL;

  if (!frontendUrl) {
    console.log("\n================================================================");
    console.log("📬 [EMAIL LOG FALLBACK] - FRONTEND_URL not configured.");
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("================================================================\n");
    return { success: true, logged: true };
  }

  const proxyUrl = `${frontendUrl.replace(/\/+$/, "")}/api/send-email`;

  try {
    const response = await axios.post(proxyUrl, { to, subject, text, html });

    if (response.status === 200) {
      console.log(`✅ Email proxied to Vercel for ${to}`);
      return { success: true, proxied: true };
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    // Log the attempt and fall back to console logging
    const message = error.response?.data?.error || error.message;
    console.log("\n================================================================");
    console.log("📬 [EMAIL LOG FALLBACK] - Vercel proxy unavailable.");
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Reason:  ${message}`);
    console.log("----------------------------------------------------------------");
    console.log(`Text:\n${text}`);
    if (html) {
      console.log("----------------------------------------------------------------");
      console.log(`HTML:\n${html}`);
    }
    console.log("================================================================\n");
    return { success: true, logged: true };
  }
};

module.exports = { sendEmail };
