import React from 'react'
import { ActivityIndicator, ListView, View } from 'react-native'
import Snackbar from 'react-native-android-snackbar'
import { Toolbar } from 'react-native-material-ui'
import * as Ravelry from '../api/__mock-api__/Ravelry'
import PatternCard from '../components/PatternCard'
import { appScreens } from '../routes'
import Theme from '../theme'

export default class HotRightNowScreen extends React.Component {
  currentPage = 0
  loading = false
  patterns = []

  constructor() {
    super()

    const patternDataSrc = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      patternDataSource: patternDataSrc.cloneWithRows([{ rowType: 'loader' }])
    }
  }

  async componentDidMount() {
    await this._loadPatternsForPage(1)
  }

  componentWillUnmount() {
    Snackbar.dismiss()
  }

  _loadPatternsForPage = async (pageNum) => {
    try {
      this.loading = true
      const { patterns } = await Ravelry.searchPatterns({ page: pageNum })
      this.loading = false

      this.currentPage = pageNum
      this.patterns = this.patterns.concat(patterns)

      const dataSrcRows = this.patterns
        .map(pattern => ({ rowType: 'pattern', pattern }))
        .concat({ rowType: 'loader' })
      const patternDataSource = this.state.patternDataSource.cloneWithRows(dataSrcRows)

      this.setState({ patternDataSource })
    } catch (e) {
      this.loading = false
      console.log(`Error loading patterns for page: ${pageNum}`, e)

      Snackbar.show('Error loading patterns', {
        duration: Snackbar.INDEFINITE,
        actionLabel: 'RETRY',
        actionColor: Theme.primaryColor,
        actionCallback: async () => await this._loadPatternsForPage(pageNum)
      })
    }
  }

  _onPatternPress = (pattern) => {
    this.props.navigation.navigate(appScreens.PATTERN_DETAILS_SCREEN, { pattern })
  }

  _renderRow = ({ rowType, pattern }) => {
    switch (rowType) {
      case 'pattern':
        return <PatternCard onPress={() => this._onPatternPress(pattern)} pattern={pattern}/>
      case 'loader':
      default:
        return (
          <View style={{ paddingVertical: 8 }}>
            <ActivityIndicator color={Theme.accentColor} size="large"/>
          </View>
        )
    }
  }

  _onEndReached = async () => {
    if (!this.loading) {
      const nextPage = this.currentPage + 1
      console.log(`Loading patterns for page: ${nextPage}`)
      await this._loadPatternsForPage(nextPage)
    }
  }

  render() {
    return (
      <View>
        <Toolbar centerElement="Hot Right Now"/>

        <ListView
          dataSource={this.state.patternDataSource}
          onEndReachedThreshold={1000}
          renderRow={this._renderRow}
          onEndReached={this._onEndReached}
        />
      </View>
    )
  }
}
