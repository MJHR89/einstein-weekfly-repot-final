import Memory from "memory";
import "https://deno.land/x/dotenv/load.ts";


// Initialize memory cache with a TTL (Time-To-Live)
const cache = new Memory({maxAge: 60 * 60 * 1000}); // TTL for cache items (e.g., 1 hour)

const TOKEN_EXPIRY_KEY = "salesforce_token_expiry";
const TOKEN_KEY = "salesforce_access_token";


export const getSalesforceToken = async () => {
  await ensureTokenValid();
  return cache.get(TOKEN_KEY) as string | undefined;
};

const ensureTokenValid = async () => {
  const tokenExpiry = cache.get(TOKEN_EXPIRY_KEY) as number | undefined;
  if (!tokenExpiry || new Date().getTime() > tokenExpiry) {
    await fetchNewAccessToken();
  }
};

const fetchNewAccessToken = async () => {
  // Retrieve client credentials from environment variables
  const salesforceInstanceUrl = Deno.env.get("SALESFORCE_ORG_URL");
  const clientId = Deno.env.get("CLIENT_ID");
  const clientSecret = Deno.env.get("CLIENT_SECRET");
  
  if (!clientId || !clientSecret) {
    throw new Error("CLIENT_ID or CLIENT_SECRET is not set in environment variables.");
  }
  
  // Prepare the request body
  const bodyParams = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(`${salesforceInstanceUrl}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyParams.toString(),
  });

  if (!response.ok) {
    // Read the response body for debugging
    const errorText = await response.text();
    throw new Error(`Failed to fetch new access token: ${response.statusText}. Response: ${errorText}`);
  }

  const data = await response.json();
  setToken(data.access_token);
};

const setToken = (token: string) => {
  const expiryTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes

  cache.set(TOKEN_KEY, token);
  cache.set(TOKEN_EXPIRY_KEY, expiryTime);
};
