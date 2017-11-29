import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Pattern from '../api/domain/Pattern'
import Card from './Card'

type Props = {
  pattern: Pattern,
  onPress: () => void,
  size: 'normal' | 'small',
  style: {}
}

const PatternCard = ({ pattern, onPress, size = 'normal', style = {} }: Props) => {
  const { name, patternAuthor, firstPhoto } = pattern

  const styles = size === 'normal' ? stylesNormal : stylesSmall

  return (
    <Card onPress={onPress} elevation={1} containerStyle={[styles.cardContainer, style]}>
      <View style={styles.cardContents}>
        <Image style={styles.thumbnail} source={{ uri: firstPhoto.photoUrl }}/>
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

const stylesCommon = {
  cardContainer: {
    padding: 0,
    margin: 8,
    marginBottom: 0
  },
  detailsContainer: {
    flex: 1,
    padding: 8
  }
}

const stylesNormal = StyleSheet.create({
  ...stylesCommon,
  cardContents: {
    flex: 1,
    flexDirection: 'row'
  },
  thumbnail: {
    width: 100,
    height: 100
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

const stylesSmall = StyleSheet.create({
  ...stylesCommon,
  cardContents: {
    flex: 1,
    flexDirection: 'column'
  },
  thumbnail: {
    flex: 1,
    height: 100
  },
  name: {
    fontSize: 14,
    fontFamily: 'sans-serif-light'
  },
  author: {
    fontSize: 10,
    fontFamily: 'sans-serif-light',
    fontStyle: 'italic'
  }
})

export default PatternCard
