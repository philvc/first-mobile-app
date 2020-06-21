import gql from 'graphql-tag';

export const GET_DAG_RAPPORT_BY_DATE = gql`
    query getDagRapportByDate($date: Date){
        dagRapportByDate(input: {date: $date}){
            id
            siteId
            input
        }
    }
`