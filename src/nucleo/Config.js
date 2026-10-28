/**
 * Core system configurations, constants and parameters.
 */

const CONFIG = {
    TIMEZONE: 'America/Sao_Paulo',
    PROTOCOL_PREFIX: 'PRPE',

    // Service Codes
    SERVICES: {
        SS01: 'SS01', // Atendimento com Serviço Social
        SS02: 'SS02', // Denúncia relativa à assistência estudantil
        PS01: 'PS01', // Acolhimento psicológico
        RU01: 'RU01', // Liberação de acesso ao RU
        RU02: 'RU02', // Parcerias no RU
        RU03: 'RU03', // Satisfação com o RU
        RU04: 'RU04', // Satisfação com a cantina
        MU01: 'MU01', // Fale com a MUC
        MU02: 'MU02', // Denúncia na MUC
        GE01: 'GE01'  // Outros assuntos
    },

    // Protected Fields that cannot be set by public forms
    PROTECTED_FIELDS: [
        'perfil',
        'responsavel',
        'situacao',
        'decisao',
        'grauAcesso'
    ],

    // Limits
    LIMITS: {
        MAX_ATTACHMENT_SIZE_MB: 5,
        MAX_ATTACHMENTS: 5,
        MAX_TOTAL_SIZE_MB: 15
    }
};

module.exports = CONFIG;
