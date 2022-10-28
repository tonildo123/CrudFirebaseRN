import { View, Text } from 'react-native'
import React from 'react'

const CreatePartidoDso = () => {


    useEffect(() => {
          const items = []
            clubes.map(item => {
                items.push({ label: item.acronimo, value: item.idClub })
            })

            setOpenLocal(items)
            setOpenVisitante(items)
            setOpenSede(items)
          
    }, [third])
    
  return (
    <View>
      <Text>CreatePartidoDso</Text>
    </View>
  )
}

export default CreatePartidoDso