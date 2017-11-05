import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Pattern from '../api/domain/Pattern'
import CollapsibleSection from '../components/CollapsibleSection'
import ParallaxImageHeaderLayout from '../components/ParallaxImageHeaderLayout'
import Theme from '../theme'

export default class PatternDetailsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = { loading: true, isDetailsSectionOpen: true }

    setTimeout(() => this.setState({ loading: false }), 2000)
  }

  _navigateBack = () => this.props.navigation.goBack()

  _renderDetailsSection = (isLoading) => {
    if (isLoading) {
      return (
        <View style={{ paddingVertical: 8 }}>
          <ActivityIndicator color={Theme.accentColor} size="large"/>
        </View>
      )
    }

    return (
      <View style={styles.titleSectionHeader}>
        <Text style={styles.name}>
          Some pattern details go here
        </Text>
      </View>
    )
  }

  render() {
    const pattern: Pattern = this.props.navigation.state.params.pattern

    const { firstPhoto } = pattern
    const photoUrl = firstPhoto.mediumUrl || firstPhoto.medium2Url || firstPhoto.squareUrl

    return (
      <ParallaxImageHeaderLayout imageSource={{ uri: photoUrl }} onNavigateBack={this._navigateBack}>
        <View style={styles.titleSectionHeader}>
          <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
            {pattern.name}
          </Text>
          <Text style={styles.author} ellipsizeMode="tail" numberOfLines={1}>
            {pattern.patternAuthor.name}
          </Text>
        </View>

        <CollapsibleSection title="Pattern Details">
          {this._renderDetailsSection(this.state.loading)}
        </CollapsibleSection>
      </ParallaxImageHeaderLayout>
    )
  }
}

const styles = StyleSheet.create({
  titleSectionHeader: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 1
  },
  detailsSectionHeader: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sectionHeaderTitle: {
    fontSize: 20,
    color: 'black'
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
