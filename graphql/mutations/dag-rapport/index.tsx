import gql from 'graphql-tag';

// fragment
import { DAG_RAPPORT_FRAGMENT } from '../../fragments/dagRapport'

export const CREATE_DAG_RAPPORT = gql`
    mutation createDagRapport($fieldA: String, $fieldB: String, $fieldC: String, $fieldD: String){
        createDagRapport(input: {fieldA: $fieldA, fieldB: $fieldB, fieldC: $fieldC, fieldD: $fieldD}){
            ...dagRapportData
        }
    }
    ${DAG_RAPPORT_FRAGMENT}
`

export const UPDATE_DAG_RAPPORT = gql`
    mutation updateDagRapport($id: String, $field: String, $data: StringOrIntOrBoolean){
        updateDagRapport(input: {id: $id, field: $field, data: $data}){
            ...dagRapportData
        }
    }
    ${DAG_RAPPORT_FRAGMENT}
`