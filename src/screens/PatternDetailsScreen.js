import React from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Snackbar from 'react-native-android-snackbar'
import * as Ravelry from '../api/__mock-api__/Ravelry'
import Pattern from '../api/domain/Pattern'
import PatternDetails from '../api/domain/PatternDetails'
import PersonalAttributes from '../api/domain/PersonalAttributes'
import CollapsibleSection from '../components/CollapsibleSection'
import ImageButton from '../components/ImageButton'
import ParallaxImageHeaderLayout from '../components/ParallaxImageHeaderLayout'
import Touchable from '../components/Touchable'
import * as StorageManager from '../manager/StorageManager'
import { appScreens } from '../routes'
import Theme from '../theme'

export default class PatternDetailsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailsLoading: true,
      isDetailsSectionOpen: true,
      patternDetails: null,
      personalAttributes: null,
      username: null,

      favoritesInProgress: false,
      libraryInProgress: false,
      queueInProgress: false
    }
  }

  async componentWillMount() {
    const { pattern } = this.props.navigation.state.params
    const [patternDetails, username] = await Promise.all([
      Ravelry.getPatternById(pattern.id),
      StorageManager.getUsername()
    ])

    this.setState({
      detailsLoading: false,
      patternDetails,
      personalAttributes: patternDetails.personalAttributes,
      username
    })
  }

  componentWillUnmount() {
    // In case of any residual snackbars when this screen is closed
    Snackbar.dismiss()
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

  _addToFavorites = async (username, patternId, retries = 0) => {
    try {
      this.setState({ favoritesInProgress: true })
      const { bookmarkId } = await Ravelry.addToFavorites(username, patternId)
      this.setState({
        favoritesInProgress: false,
        personalAttributes: {
          ...this.state.personalAttributes,
          isFavorite: true,
          bookmarkId
        }
      })

      Snackbar.show('Added to Favorites!', { duration: Snackbar.SHORT })
    } catch (e) {
      console.log(`Error occurred while adding pattern ${patternId} to favorites`, e)
      if (retries > 2) {
        Snackbar.show(`Something's going wrong, please try again later`, { duration: Snackbar.LONG })
        return
      }

      Snackbar.show('Error adding to favorites...', {
        duration: Snackbar.LONG,
        actionLabel: 'RETRY',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._addToFavorites(username, patternId, retries + 1)
      })
      this.setState({ favoritesInProgress: false })
    }
  }

  _removeFromFavorites = async (username, bookmarkId, patternId, retries = 0) => {
    try {
      this.setState({ favoritesInProgress: true })
      await Ravelry.removeFromFavorites(username, bookmarkId)
      this.setState({
        favoritesInProgress: false,
        personalAttributes: {
          ...this.state.personalAttributes,
          isFavorite: false,
          bookmarkId: null
        }
      })

      Snackbar.show('Removed from Favorites', {
        duration: Snackbar.LONG,
        actionLabel: 'UNDO',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._addToFavorites(username, patternId)
      })
    } catch (e) {
      console.log(`Error occurred while removing bookmark ${bookmarkId} from favorites`, e)
      if (retries > 2) {
        Snackbar.show(`Something's going wrong, please try again later`, { duration: Snackbar.LONG })
        return
      }

      Snackbar.show('Error removing from favorites...', {
        duration: Snackbar.LONG,
        actionLabel: 'RETRY',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._removeFromFavorites(username, bookmarkId, patternId, retries + 1)
      })
      this.setState({ favoritesInProgress: false })
    }
  }

  _addToLibrary = async (patternId, retries = 0) => {
    try {
      this.setState({ libraryInProgress: true })
      await Ravelry.addToLibrary(patternId)
      this.setState({
        libraryInProgress: false,
        personalAttributes: {
          ...this.state.personalAttributes,
          isInLibrary: true
        }
      })

      Snackbar.show('Added to Library!', { duration: Snackbar.SHORT })
    } catch (e) {
      console.log(`Error occurred while adding pattern ${patternId} to library`, e)
      if (retries > 2) {
        Snackbar.show(`Something's going wrong, please try again later`, { duration: Snackbar.LONG })
        return
      }

      Snackbar.show('Error adding to library...', {
        duration: Snackbar.LONG,
        actionLabel: 'RETRY',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._addToLibrary(patternId, retries + 1)
      })
      this.setState({ libraryInProgress: false })
    }
  }

  _removeFromLibrary = async (username, patternName, patternId, retries = 0) => {
    try {
      this.setState({ libraryInProgress: true })
      const { paginator, volumes } = await Ravelry.searchLibrary(username, { query: patternName })
      if (paginator.pageCount === 0) {
        console.log(`Remove from library: No patterns found for name: ${patternName}`)
        this.setState({
          libraryInProgress: false,
          personalAttributes: {
            ...this.state.personalAttributes,
            isInLibrary: false
          }
        })

        return
      }

      const [patternVolume] = volumes
      await Ravelry.removeFromLibrary(patternVolume.id)

      this.setState({
        libraryInProgress: false,
        personalAttributes: {
          ...this.state.personalAttributes,
          isInLibrary: false
        }
      })

      Snackbar.show('Removed from Library', {
        duration: Snackbar.LONG,
        actionLabel: 'UNDO',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._addToLibrary(patternId)
      })
    } catch (e) {
      console.log(`Error occurred while removing pattern ${patternName} from library`, e)
      if (retries > 2) {
        Snackbar.show(`Something's going wrong, please try again later`, { duration: Snackbar.LONG })
        return
      }

      Snackbar.show('Error removing from library...', {
        duration: Snackbar.LONG,
        actionLabel: 'RETRY',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._removeFromLibrary(username, patternName, patternId, retries + 1)
      })
      this.setState({ libraryInProgress: false })
    }
  }

  _addToQueue = async (username, patternId, retries = 0) => {
    try {
      this.setState({ queueInProgress: true })
      await Ravelry.addToQueue(username, patternId)
      this.setState({
        queueInProgress: false,
        personalAttributes: {
          ...this.state.personalAttributes,
          isQueued: true
        }
      })

      Snackbar.show('Added to Queue!', { duration: Snackbar.SHORT })
    } catch (e) {
      console.log(`Error occurred while adding pattern ${patternId} to queue`, e)
      if (retries > 2) {
        Snackbar.show(`Something's going wrong, please try again later`, { duration: Snackbar.LONG })
        return
      }

      Snackbar.show('Error adding to queue...', {
        duration: Snackbar.LONG,
        actionLabel: 'RETRY',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._addToQueue(username, patternId, retries + 1)
      })
      this.setState({ queueInProgress: false })
    }
  }

  _removeFromQueue = async (username, patternId, retries = 0) => {
    try {
      this.setState({ queueInProgress: true })
      const { paginator, queuedProjects } = await Ravelry.searchQueue(username, { patternId })
      if (paginator.pageCount === 0) {
        console.log(`Remove from queue: No patterns found for id: ${patternId}`)
        this.setState({
          queueInProgress: false,
          personalAttributes: {
            ...this.state.personalAttributes,
            isQueued: false
          }
        })

        return
      }

      const [queuedProject] = queuedProjects
      await Ravelry.removeFromQueue(username, queuedProject.id)
      this.setState({
        queueInProgress: false,
        personalAttributes: {
          ...this.state.personalAttributes,
          isQueued: false
        }
      })

      Snackbar.show('Removed from Queue', {
        duration: Snackbar.LONG,
        actionLabel: 'UNDO',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._addToQueue(username, patternId)
      })
    } catch (e) {
      console.log(`Error occurred while removing pattern ${patternId} from queue`, e)
      if (retries > 2) {
        Snackbar.show(`Something's going wrong, please try again later`, { duration: Snackbar.LONG })
        return
      }

      Snackbar.show('Error removing from queue...', {
        duration: Snackbar.LONG,
        actionLabel: 'RETRY',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._removeFromQueue(username, patternId, retries + 1)
      })
      this.setState({ queueInProgress: false })
    }
  }

  _renderQuickActionsSection = (pattern: Pattern, username: string, personalAttributes: PersonalAttributes) => {
    const isFavorite = personalAttributes.isFavorite && personalAttributes.bookmarkId
    const btnFavorites = {
      disabled: this.state.favoritesInProgress,
      image: isFavorite ? 'favorite' : 'favorite-border',
      title: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
      onPress: isFavorite
        ? () => this._removeFromFavorites(username, personalAttributes.bookmarkId, pattern.id)
        : () => this._addToFavorites(username, pattern.id)
    }

    const isInLibrary = personalAttributes.isInLibrary
    const btnLibrary = {
      disabled: this.state.libraryInProgress,
      image: isInLibrary ? 'remove-circle' : 'library-add',
      title: isInLibrary ? 'Remove from Library' : 'Add to Library',
      onPress: isInLibrary
        ? () => this._removeFromLibrary(username, pattern.name, pattern.id)
        : () => this._addToLibrary(pattern.id)
    }

    const isInQueue = personalAttributes.isQueued
    const btnQueue = {
      disabled: this.state.queueInProgress,
      image: isInQueue ? 'remove-circle' : 'playlist-add',
      title: isInQueue ? 'Remove from Queue' : 'Add to Queue',
      onPress: isInQueue
        ? () => this._removeFromQueue(username, pattern.id)
        : () => this._addToQueue(username, pattern.id)
    }

    return (
      <View style={styles.quickActionsContainer}>
        <ImageButton {...btnFavorites}/>
        <ImageButton {...btnLibrary}/>
        <ImageButton {...btnQueue}/>
      </View>
    )
  }

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

          {this.state.detailsLoading
            ? null
            : this._renderQuickActionsSection(
              pattern,
              this.state.username,
              this.state.personalAttributes
            )
          }
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
    paddingTop: 16,
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
    fontFamily: 'sans-serif-light',
    paddingHorizontal: 8
  },
  author: {
    fontSize: 12,
    fontFamily: 'sans-serif-light',
    fontStyle: 'italic',
    paddingHorizontal: 8,
    marginBottom: 8
  },
  quickActionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
