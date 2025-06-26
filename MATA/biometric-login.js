window.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('/generate-authentication-options');
      const options = await res.json();
  
      const authResp = await SimpleWebAuthnBrowser.startAuthentication(options);
  
      const verification = await fetch('/verify-authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authResp),
      }).then(res => res.json());
  
      if (verification.verified) {
        // Automatically redirect to dashboard
        window.location.href = `/dashboard?user=${verification.userId}`;
      }
    } catch (err) {
      console.log("Biometric login not available or cancelled.");
    }
  });
  