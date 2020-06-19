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

export const GET_DAG_RAPPORT_BY_DATE = gql`
    query getDagRapportByDate($date: Date){
        getDagRapportByDate(input: {date: $date}){
            id
            siteId
            input
        }
    }
`