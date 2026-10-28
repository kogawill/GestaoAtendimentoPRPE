const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

/**
 * Generates a signed payload for communication with the Nucleo.
 *
 * @param {string} clientId
 * @param {string} keyId
 * @param {string} action
 * @param {string} identity
 * @param {object} payload
 * @param {string} secret
 * @returns {object} The signed envelope
 */
function generateSignedPayload(clientId, keyId, action, identity, payload, secret) {
    const requestId = uuidv4();
    const timestamp = new Date().toISOString();
    const nonce = crypto.randomBytes(16).toString('hex');

    // Create canonical representation
    // To ensure consistency, stringify the payload. If payload is an object, sort keys or just stringify.
    const payloadStr = JSON.stringify(payload);

    const canonicalString = `${clientId}|${keyId}|${requestId}|${timestamp}|${nonce}|${action}|${identity}|${payloadStr}`;

    const signature = crypto.createHmac('sha256', secret)
        .update(canonicalString)
        .digest('hex');

    return {
        clientId,
        keyId,
        requestId,
        timestamp,
        nonce,
        action,
        identity,
        payload,
        signature
    };
}

module.exports = {
    generateSignedPayload
};
