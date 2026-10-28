const CONFIG = require('./Config');

/**
 * Catalog of available services and routing rules.
 */
const CATALOG = [
    {
        codigo: CONFIG.SERVICES.SS01,
        descricao: 'Atendimento com Serviço Social',
        setorDestino: 'Serviço Social',
        sigiloso: true
    },
    {
        codigo: CONFIG.SERVICES.SS02,
        descricao: 'Denúncia relativa à assistência estudantil',
        setorDestino: 'Serviço Social', // fila específica
        sigiloso: true
    },
    {
        codigo: CONFIG.SERVICES.PS01,
        descricao: 'Acolhimento psicológico',
        setorDestino: 'Setor de Psicologia',
        sigiloso: true
    },
    {
        codigo: CONFIG.SERVICES.RU01,
        descricao: 'Liberação de acesso ao RU',
        setorDestino: 'Serviço Social', // análise e operação posterior
        sigiloso: false
    },
    {
        codigo: CONFIG.SERVICES.RU02,
        descricao: 'Parcerias no RU',
        setorDestino: 'Nutrição', // Setor de Nutrição e gestão do RU
        sigiloso: false
    },
    {
        codigo: CONFIG.SERVICES.RU03,
        descricao: 'Satisfação com o RU',
        setorDestino: 'Nutrição',
        sigiloso: false
    },
    {
        codigo: CONFIG.SERVICES.RU04,
        descricao: 'Satisfação com a cantina',
        setorDestino: 'Nutrição',
        sigiloso: false
    },
    {
        codigo: CONFIG.SERVICES.MU01,
        descricao: 'Fale com a MUC',
        setorDestino: 'MUC', // Gestão da MUC e DAE
        sigiloso: false
    },
    {
        codigo: CONFIG.SERVICES.MU02,
        descricao: 'Denúncia na MUC',
        setorDestino: 'MUC', // Fila restrita MUC/DAE e Comissão Disciplinar
        sigiloso: true
    },
    {
        codigo: CONFIG.SERVICES.GE01,
        descricao: 'Outros assuntos',
        setorDestino: 'Triagem central',
        sigiloso: false
    }
];

/**
 * Retrieves service configuration by code.
 *
 * @param {string} code
 * @returns {object|null} The service definition or null if not found.
 */
function getServiceByCode(code) {
    if (!code) return null;
    return CATALOG.find(s => s.codigo === code) || null;
}

module.exports = {
    CATALOG,
    getServiceByCode
};
