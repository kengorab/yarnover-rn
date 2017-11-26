import React from 'react'
import { Text, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'

export default class SearchScreen extends React.Component {
  state = {
    searching: false,
    searchText: ''
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

  render() {
    return (
      <View>
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
        <Text>{this.state.searchText}</Text>
      </View>
    )
  }
}
