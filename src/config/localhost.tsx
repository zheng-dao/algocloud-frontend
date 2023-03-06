// Place the URL here with the /api suffix.
// Ex.:`https://domain.com/api`;
const backendUrl = `http://localhost:8080/api`;

// SwaggerUI Documentation URL
// Leave black if documentation should be hidden
const apiDocumentationUrl = `http://localhost:8080/documentation`;

/**
 * Frontend Url.
 */
const frontendUrl = {
  host: 'localhost:3000',
  protocol: 'http',
};

/**
 * Tenant Mode
 * multi: Allow new users to create new tenants.
 * multi-with-subdomain: Same as multi, but enable access to the tenant via subdomain.
 * single: One tenant, the first user to register will be the admin.
 */
const tenantMode = 'multi';

/**
 * Plan payments configuration.
 */
const isPlanEnabled = true;
const stripePublishableKey = 'pk_test_51JpIyQLnyNFZ6q7AEmHZJN6WgBTYMH6vuKmAgXxUPirX9TFm6YbiUH2GmeRh5xGcSpMaD3DNm8iDYxNIxObigfWt00alQ3BPmS';
const STREAM_API_KEY='q7xasuw4uf5k'
const STREAM_SECRET_KEY='84gayfm9sbx6zuy5j78a8y8daykdggv5hpytkb6b3bp2z8zg9vnzjs62d54su6xx'

export default {
  frontendUrl,
  backendUrl,
  apiDocumentationUrl,
  tenantMode,
  isPlanEnabled,
  stripePublishableKey,
  STREAM_API_KEY,
  STREAM_SECRET_KEY
};
