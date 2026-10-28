const { verifySignature } = require('./AuthService');

/**
 * Mocks the doPost function of Google Apps Script.
 *
 * @param {object} e The event object containing postData.
 * @returns {string} JSON response
 */
function doPost(e) {
    try {
        if (!e || !e.postData || !e.postData.contents) {
             return JSON.stringify({
                ok: false,
                code: 'VALIDATION_ERROR',
                message: 'Invalid request format.'
            });
        }

        const envelope = JSON.parse(e.postData.contents);

        // In a real environment, retrieve this from PropertiesService
        const sharedSecret = process.env.SHARED_SECRET || "default_secret";
        const isValid = verifySignature(envelope, sharedSecret);

        if (!isValid) {
            return JSON.stringify({
                ok: false,
                code: 'ACCESS_DENIED',
                message: 'Invalid signature or expired request.'
            });
        }

        // Mock processing the action
        return JSON.stringify({
            ok: true,
            code: 'SUCCESS',
            requestId: envelope.requestId,
            data: { receivedAction: envelope.action },
            message: 'Request successfully authenticated and processed.'
        });

    } catch (error) {
        return JSON.stringify({
            ok: false,
            code: 'INTERNAL_ERROR',
            message: 'An error occurred processing the request.'
        });
    }
}

module.exports = {
    doPost
};
