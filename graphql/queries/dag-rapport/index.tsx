import gql from 'graphql-tag';

// fragment
import { DAG_RAPPORT_FRAGMENT } from '../../fragments/dagRapport';

export const GET_DAG_RAPPORT_BY_DATE = gql`
    query getDagRapportByDate($date: String){
        dagRapportByDate(input: {date: $date}){
            ...dagRapportData
        }
    }
    ${DAG_RAPPORT_FRAGMENT}
`