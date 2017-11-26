import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'

export default class SearchScreen extends React.Component {
  state = {
    searching: false,
    searchText: '',
    searchResults: null
  }

  _enterSearch = () => this.setState({ searching: true })
  _exitSearch = () => this.setState({ searching: false })
  _setSearchText = (searchText) => this.setState({ searchText })

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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Toolbar
          searchable={{
            onSearchPressed: this._enterSearch,
            onSearchClosed: this._exitSearch,
            onSubmitEditing: this._exitSearch,
            onChangeText: this._setSearchText,
            autoFocus: true,
            placeholder: 'hat, socks, scarf, etc'
          }}
          isSearchActive={this.state.searching}
          centerElement={this._getToolbarTitle()}
        />
        {!this.state.searchResults && !this.state.searching && this._renderZeroState()}
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
  }
})
