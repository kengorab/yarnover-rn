import React from 'react'
import { StyleSheet, View, ViewPagerAndroid } from 'react-native'
import PhotoView from 'react-native-photo-view'

export default class PhotoViewScreen extends React.Component {
  _navigateBack = () => this.props.navigation.goBack()

  render() {
    const { activePhotoIndex, allPhotos } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <ViewPagerAndroid style={styles.container} initialPage={activePhotoIndex}>
          {allPhotos.map((photo, i) =>
            <View key={i} style={{ flex: 1 }}>
              <PhotoView
                onViewTap={this._navigateBack}
                source={{ uri: photo.photoUrl }}
                style={styles.photo}
              />
            </View>
          )}
        </ViewPagerAndroid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  photo: {
    flex: 1
  }
})
