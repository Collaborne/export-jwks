const logger = require('log4js').getLogger();

/**
 * @typedef JWK
 * @property {string} kid Key id
 * @property {string} kty Key type
 * @property {string} use Intended key usage
 */

/**
 * @typedef JWKs
 * @property {JWK[]} keys
 */

/**
 * Export a single JWK
 *
 * @param {JWK} jwk the key to export
 * @return {JWK} the exported key
 */
function exportJwk(jwk) {
	const fields = ['kty', 'use', 'kid'];

	switch (jwk.kty) {
	case 'RSA':
		fields.push('n', 'e');
		break;
	default:
		// Essentially: We don't know what this is, so we're not touching it.
		logger.warn(`Not exporting any fields for JWK '${jwk.kid}' with type '${jwk.kty}'`);
		break;
	}

	return fields.reduce((agg, field) => {
		agg[field] = jwk[field];
		return agg;
	}, {});
}

/**
 * Filter the provided JWKs to only include the public data
 *
 * @param {JWKs} jwks JWKs to export
 * @return {JWKs} exported JWKS
 */
function exportJwks(jwks) {
	return {
		keys: jwks.keys.map(exportJwk)
	};
}

module.exports = exportJwks;
