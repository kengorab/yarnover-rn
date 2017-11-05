import React from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import * as Ravelry from '../api/__mock-api__/Ravelry'
import Pattern from '../api/domain/Pattern'
import PatternDetails from '../api/domain/PatternDetails'
import CollapsibleSection from '../components/CollapsibleSection'
import ParallaxImageHeaderLayout from '../components/ParallaxImageHeaderLayout'
import Touchable from '../components/Touchable'
import { appScreens } from '../routes'
import Theme from '../theme'

export default class PatternDetailsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailsLoading: true,
      isDetailsSectionOpen: true,
      patternDetails: null
    }
  }

  async componentWillMount() {
    const { pattern } = this.props.navigation.state.params
    const patternDetails = await Ravelry.getPatternById(pattern.id)
    this.setState({ detailsLoading: false, patternDetails })
  }

  _navigateBack = () => this.props.navigation.goBack()

  _navigateToPhotosViewer = (activePhotoIndex, allPhotos) =>
    this.props.navigation.navigate(appScreens.PHOTO_VIEW_SCREEN, { activePhotoIndex, allPhotos })

  _detailsTableRows = (patternDetails: PatternDetails) => {
    const rows = [
      ['Published In', patternDetails.printings, printings => printings[0].source.name],
      ['Craft', patternDetails.craft.name],
      ['Categories', patternDetails.patternCategories, categories => categories.map(({ name }) => name).join(', ')],
      ['Published', patternDetails.published],
      ['Yarn Weight', patternDetails.yarnWeightDesc],
      ['Weight Category', patternDetails.yarnWeight, ({ weight }) => `${weight.weight} (${weight.name})`],
      ['Gauge', patternDetails.gaugeDesc],
      ['Needle Sizes', patternDetails.patternNeedleSizes, sizes => sizes.map(({ name }) => name).join('\n')],
      ['Yardage', patternDetails.yardageDesc]
    ]

    return rows
      .map(([name, field, fn]) => [
        name,
        field ? (fn ? fn(field) : field) : null
      ])
      .filter(([key, value]) => !!value && value.length > 0)
  }

  _renderDetailsSection = (patternDetails: PatternDetails) => {
    const detailsTable = this._detailsTableRows(patternDetails)
      .map(([title, data]) =>
        <View key={title} style={styles.patternDetailsRow}>
          <Text style={styles.patternDetailsRowTitleText}>{title}</Text>
          <Text style={styles.patternDetailsRowText}>{data}</Text>
        </View>
      )

    return (
      <View style={styles.patternDetailsContainer}>
        {detailsTable}
      </View>
    )
  }

  _renderPhotosSection = (patternDetails: PatternDetails) =>
    <ScrollView horizontal={true} style={{ padding: 16 }}>
      {patternDetails.photos.map((photo, i) =>
        <Touchable key={i} onPress={() => this._navigateToPhotosViewer(i, patternDetails.photos)}>
          <Image
            style={{ width: 200, height: 200, marginHorizontal: 8 }}
            source={{ uri: photo.photoUrl }}
          />
        </Touchable>
      )}
    </ScrollView>

  render() {
    const pattern: Pattern = this.props.navigation.state.params.pattern

    const { firstPhoto } = pattern
    const photoUrl = firstPhoto.mediumUrl || firstPhoto.medium2Url || firstPhoto.squareUrl

    const renderContents = () =>
      <View style={{ paddingBottom: 96 }}>
        <CollapsibleSection title="Pattern Details">
          {this._renderDetailsSection(this.state.patternDetails)}
        </CollapsibleSection>
        <CollapsibleSection title="Photos" initOpen={false}>
          {this._renderPhotosSection(this.state.patternDetails)}
        </CollapsibleSection>
      </View>

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

        {this.state.detailsLoading
          ? (
            <View style={{ paddingVertical: 8 }}>
              <ActivityIndicator color={Theme.accentColor} size="large"/>
            </View>
          )
          : renderContents()
        }
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
  },
  patternDetailsContainer: {
    flex: 1,
    paddingHorizontal: 32
  },
  patternDetailsRow: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 4
  },
  patternDetailsRowText: {
    flex: 1,
    flexWrap: 'wrap'
  },
  patternDetailsRowTitleText: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold'
  }
})
