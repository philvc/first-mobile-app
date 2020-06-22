
export const actions = {
    FIELDA_CHANGED: 'fieldA',
    FIELDB_CHANGED: 'fieldB',
    FIELDC_CHANGED: 'fieldC',
    FIELDD_CHANGED: 'fieldD',
}

export function reducer(state: any, action: any) {
    switch (action.type) {
        case actions.FIELDA_CHANGED:
            return {
                ...state,
                [actions.FIELDA_CHANGED]: action.payload
            }
        case actions.FIELDB_CHANGED:
            return {
                ...state,
                [actions.FIELDB_CHANGED]: action.payload
            }
        case actions.FIELDC_CHANGED:
            return {
                ...state,
                [actions.FIELDC_CHANGED]: action.payload
            }
        case actions.FIELDD_CHANGED:
            return {
                ...state,
                [actions.FIELDD_CHANGED]: action.payload
            };

        default:
            return state
    }
}