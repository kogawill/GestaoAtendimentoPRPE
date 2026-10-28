const crypto = require('crypto');
const CONFIG = require('./Config');

/**
 * Generates a public protocol string.
 * Format: PRPE-YYYY-XXXXXX
 *
 * @param {number|string} year
 * @param {number|string} sequenceNumber
 * @returns {string} Formatted protocol string
 */
function generateProtocol(year, sequenceNumber) {
    const seqStr = String(sequenceNumber).padStart(6, '0');
    return `${CONFIG.PROTOCOL_PREFIX}-${year}-${seqStr}`;
}

/**
 * Generates an internal unique identifier (UUID v4).
 * @returns {string} UUID string
 */
function generateUUID() {
    return crypto.randomUUID();
}

/**
 * Placeholder for Idempotency check.
 * In a real GAS application, this would use LockService, CacheService, and PropertiesService.
 * @param {string} submissionKey
 * @returns {boolean} True if processed, false otherwise.
 */
function isAlreadyProcessed(submissionKey) {
    // PoC Mock
    return false;
}

module.exports = {
    generateProtocol,
    generateUUID,
    isAlreadyProcessed
};
