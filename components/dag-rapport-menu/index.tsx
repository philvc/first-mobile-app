// modules
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import { format } from 'date-fns';

// components
import FindDagRapport from './dag-rapport-find'
import CreateDagRapport from './dag-rapport-create';
import DagRapportDetails from './dag-rapport-details';

// graphql
import { GET_DAG_RAPPORT_BY_DATE, GET_SELECTED_RAPPORT } from '../../graphql/queries/dag-rapport';
import { CREATE_DAG_RAPPORT } from '../../graphql/mutations/dag-rapport';

const Tab = createBottomTabNavigator();

export default function DagRapportMenu() {
  // client
  const client = useApolloClient()

  // state
  const [initDagRapport, setInitDagRapport] = useState(false)


  // queries
  const { loading, error, data } = useQuery(GET_DAG_RAPPORT_BY_DATE, {
    variables: {
      date: format(new Date(), 'MMMM/dd/yyyy')
    },
    onCompleted({ dagRapportByDate }) {
      console.log('dagrapport menu ', dagRapportByDate)
      if (dagRapportByDate.length > 0) {

        client.writeQuery({
          query: GET_SELECTED_RAPPORT,
          data: {
            selectedRapport: dagRapportByDate[0]
          }
        })
        setInitDagRapport(true)
      }
      createDagRapport()

    }
  })

  // mutations
  const [createDagRapport] = useMutation(CREATE_DAG_RAPPORT, {
    variables: { fieldA: '', fieldB: '', fieldC: '', fieldD: '' },
    onCompleted({ createDagRapport }) {
      console.log('crateDagRapport', createDagRapport)
      client.writeQuery({
        query: GET_SELECTED_RAPPORT,
        data: {
          selectedRapport: createDagRapport
        }
      })

      setInitDagRapport(true)
    }
  })

  if (!initDagRapport) return null;

  return (
    <Tab.Navigator initialRouteName="Find">
      <Tab.Screen name="Find" component={FindDagRapport} />
      <Tab.Screen name="Create" component={CreateDagRapport} />
      <Tab.Screen name="Read" component={DagRapportDetails} />
    </Tab.Navigator>
  )
}