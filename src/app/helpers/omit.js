



/**
 * Omit
 */
export default function omit(object, keys) {
    return Object.fromEntries(
        Object.entries(object)
            .filter(k => !keys.includes(k[0])
        )
    )
}