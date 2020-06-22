import gql from 'graphql-tag';

export const DAG_RAPPORT_FRAGMENT = gql`
    fragment dagRapportData on DagRapport {
        id
        fieldA
        fieldB
        fieldC
        fieldD
        date
    }
`