import errors from 'restify-errors'

/**
 * Maps inter-level and returns inter-level value from database.
 * @param {string} inter_level scg inter-level value
 * @returns {string} inter-level value from database.
 */
export default function(inter_level) {
    switch(inter_level) {
        case 'provinces':
            return 'Prov'
        case 'cities':
            return 'City'
        case 'municipalities':
            return 'Mun'
        case 'regions':
            return 'Reg'
        case 'barangays':
            return 'Bgy'
        default:
            return new errors.BadRequestError('Invalid Inter-level value')
    }
}