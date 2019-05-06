import React from 'react';
import { View, FlatList, ActivityIndicator} from 'react-native';
import { ListItem } from 'react-native-elements'

export const renderHeader = (postData) => {
    return (
      <FlatList
        horizontal={true}
        data={postData}
        renderItem={(data) => (
          <ListItem
            roundAvatar
            avatar={{uri: data.item.avatar}}
            containerStyle={{ borderBottomWidth: 0 }}
            hideChevron={true}
          />
        )}
        keyExtractor={(data) => data.id}
      />
    )
}

export const renderFooter = (loading) => {
    if (!loading) return null
    return (
        <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor:"#CED0CE"}}>
            <ActivityIndicator animating size="large"/>
        </View>
    )
}