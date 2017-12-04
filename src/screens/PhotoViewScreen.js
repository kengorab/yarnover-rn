import React from 'react'
import { StyleSheet, View, ViewPagerAndroid } from 'react-native'
import PhotoView from 'react-native-photo-view'

const PhotoViewScreen = ({ activePhotoIndex, allPhotos, onClose }) =>
  <View style={styles.container}>
    <ViewPagerAndroid style={styles.container} initialPage={activePhotoIndex}>
      {allPhotos.map((photo, i) =>
        <View key={i} style={{ flex: 1 }}>
          <PhotoView onViewTap={onClose} source={{ uri: photo.photoUrl }} style={styles.photo}/>
        </View>
      )}
    </ViewPagerAndroid>
  </View>

export default PhotoViewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  photo: {
    flex: 1
  }
})
