const crypto = require('crypto');

/**
 * Verifies the signature and validity of the envelope.
 *
 * @param {object} envelope
 * @param {string} secret
 * @returns {boolean} True if valid, false otherwise.
 */
function verifySignature(envelope, secret) {
    const {
        clientId,
        keyId,
        requestId,
        timestamp,
        nonce,
        action,
        identity,
        payload,
        signature
    } = envelope;

    // Check if timestamp is within 5 minutes
    const requestTime = new Date(timestamp).getTime();
    const now = new Date().getTime();
    const fiveMinutes = 5 * 60 * 1000;

    if (isNaN(requestTime) || Math.abs(now - requestTime) > fiveMinutes) {
        return false;
    }

    const payloadStr = JSON.stringify(payload);

    const canonicalString = `${clientId}|${keyId}|${requestId}|${timestamp}|${nonce}|${action}|${identity}|${payloadStr}`;

    const expectedSignature = crypto.createHmac('sha256', secret)
        .update(canonicalString)
        .digest('hex');

    // Use timingSafeEqual to prevent timing attacks
    if (signature.length !== expectedSignature.length) {
        return false;
    }

    return crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(expectedSignature, 'utf8'));
}

module.exports = {
    verifySignature
};
