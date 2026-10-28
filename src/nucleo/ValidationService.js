const CONFIG = require('./Config');
const { getServiceByCode } = require('./CatalogService');

/**
 * Validates a submission payload based on section 4 rules.
 *
 * @param {object} payload
 * @returns {object} { isValid: boolean, message?: string }
 */
function validateSubmission(payload) {
    if (!payload || typeof payload !== 'object') {
        return { isValid: false, message: 'Payload cannot be empty' };
    }

    // Required Technical Data
    if (!payload.codigoServico) {
        return { isValid: false, message: 'Missing required technical field: codigoServico' };
    }

    if (!payload.chaveSubmissao) {
         return { isValid: false, message: 'Missing required technical field: chaveSubmissao' };
    }

    if (!payload.versaoFormulario) {
         return { isValid: false, message: 'Missing required technical field: versaoFormulario' };
    }

    // Validate service code exists in catalog
    const service = getServiceByCode(payload.codigoServico);
    if (!service) {
        return { isValid: false, message: `Unknown service code: ${payload.codigoServico}` };
    }

    // Check for protected/malicious fields
    const payloadKeys = Object.keys(payload);
    for (const key of payloadKeys) {
        if (CONFIG.PROTECTED_FIELDS.includes(key)) {
             return { isValid: false, message: `Submission rejected: attempt to set protected field '${key}'` };
        }
    }

    return { isValid: true };
}

module.exports = {
    validateSubmission
};
