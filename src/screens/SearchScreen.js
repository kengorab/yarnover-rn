import _ from 'lodash'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import * as Ravelry from '../api/__mock-api__/Ravelry'
import GridView from '../components/GridView'
import PatternCard from '../components/PatternCard'
import Theme from '../theme'

export default class SearchScreen extends React.Component {
  currentPage = 0
  query = null
  loading = false
  patterns = null
  paginator = null

  constructor() {
    super()

    const patternDataSrc = new GridView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      patternDataSource: patternDataSrc.cloneWithRows([[{ rowType: 'loader' }]]),

      zeroState: true,
      searching: false,
      searchText: ''
    }
  }

  _enterSearch = () => this.setState({ searching: true })
  _exitSearch = () => this.setState({ searching: false })
  _setSearchText = (searchText) => this.setState({ searchText })

  _performSearch = async () => {
    if (!this.state.searchText) {
      return
    }

    this.patterns = null
    this.paginator = null

    this.setState({
      searching: false,
      zeroState: false,
      patternDataSource: this.state.patternDataSource.cloneWithRows([[{ rowType: 'loader' }]])
    })
    await this._loadPatternsForPage(this.state.searchText, 0)
  }

  _loadPatternsForPage = async (query, pageNum) => {
    try {
      this.loading = true
      const { paginator, patterns } = await Ravelry.searchPatterns({ query, page: pageNum, pageSize: 24 })

      this.paginator = this.paginator || paginator
      this.patterns = (this.patterns || []).concat(patterns)
      this.loading = false
      this.query = query
      this.currentPage = pageNum

      if (patterns.length === 0) {
        const patternDataSource = this.state.patternDataSource.cloneWithRows([[{ rowType: 'no-results' }]])

        this.setState({ patternDataSource })
        return
      }

      const lastItem = paginator.pageCount === pageNum + 1
        ? { rowType: 'no-more-results' }
        : { rowType: 'loader' }
      const dataSrcRows = _.chain(this.patterns)
        .map(pattern => ({ rowType: 'pattern', pattern }))
        .chunk(2)
        .concat([[lastItem]])
        .value()
      const patternDataSource = this.state.patternDataSource.cloneWithRows(dataSrcRows)

      this.setState({ patternDataSource })
    } catch (e) {
      this.loading = false
      console.log(`Error loading patterns for page: ${pageNum}`, e)
    }
  }

  _getToolbarTitle = () => {
    if (this.state.searching) {
      return ''
    }
    return this.state.searchText || 'Search Patterns'
  }

  _renderZeroState = () =>
    <View style={styles.zeroStateContainer}>
      <Text style={styles.zeroStateText}>
        Search for pattern keywords (like "cabled hat" or "comfy socks") using the search icon above.
      </Text>
    </View>

  _renderRow = ({ rowType, pattern }) => {
    switch (rowType) {
      case 'pattern':
        return <PatternCard size="small" onPress={() => null} pattern={pattern} style={{ margin: 0 }}/>
      case 'no-more-results':
        return (
          <View style={{ paddingVertical: 8, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>No more results found for search</Text>
          </View>
        )
      case 'no-results':
        return (
          <View style={{ paddingVertical: 8, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>No results found for search. Please try different search terms</Text>
          </View>
        )
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
      console.log('nextPage', nextPage, 'this.paginator.lastPage', this.paginator.lastPage)
      if (nextPage < this.paginator.lastPage) {
        await this._loadPatternsForPage(this.query, nextPage)
      }
    }
  }

  _renderResults = () =>
    <GridView
      itemsPerRow={2}
      dataSource={this.state.patternDataSource}
      renderItem={this._renderRow}
      itemStyle={{ margin: 4 }}
      style={{ margin: 4 }}
      onEndReachedThreshold={240}
      onEndReached={this._onEndReached}
    />

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Toolbar
          searchable={{
            onSearchPressed: this._enterSearch,
            onSearchClosed: this._exitSearch,
            onSubmitEditing: this._performSearch,
            onChangeText: this._setSearchText,
            autoFocus: true,
            placeholder: 'hat, socks, scarf, etc'
          }}
          isSearchActive={this.state.searching}
          centerElement={this._getToolbarTitle()}
        />
        {this.state.zeroState ? this._renderZeroState() : this._renderResults()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  zeroStateContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  zeroStateText: {
    textAlign: 'center'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
