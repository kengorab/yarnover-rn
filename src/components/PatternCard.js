import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Pattern from '../api/domain/Pattern'
import Card from './Card'

type Props = {
  pattern: Pattern
}

const PatternCard = ({ pattern }: Props) => {
  const { name, patternAuthor, firstPhoto } = pattern
  const photoUrl = firstPhoto.mediumUrl || firstPhoto.medium2Url || firstPhoto.squareUrl

  return (
    <Card elevation={1} containerStyle={{ padding: 0 }}>
      <View style={styles.cardContents}>
        <Image style={styles.thumbnail} source={{ uri: photoUrl }}/>
        <View style={styles.detailsContainer}>
          <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.author} ellipsizeMode="tail" numberOfLines={1}>
            {patternAuthor.name}
          </Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContents: {
    flex: 1,
    flexDirection: 'row'
  },
  thumbnail: {
    width: 100,
    height: 100
  },
  detailsContainer: {
    flex: 1,
    padding: 8
  },
  name: {
    fontSize: 16,
    fontFamily: 'sans-serif-light'
  },
  author: {
    fontSize: 12,
    fontFamily: 'sans-serif-light',
    fontStyle: 'italic'
  }
})

export default PatternCard
