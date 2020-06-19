import gql from 'graphql-tag';

export const CREATE_DAG_RAPPORT = gql`
    mutation createDagRapport($input: String, $siteId: String){
        createDagRapport(input: {input: $input, siteId: $siteId}){
            id
            siteId
            input
        }
    }
`