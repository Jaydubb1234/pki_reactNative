import * as React from 'react';
import { Text} from 'react-native';
import { Card, ListItem } from 'react-native-elements'

const PostCard = ({post}) => {
    const {item} = post
    return (
        <Card containerStyle={{margin:10}}>
            <ListItem
                // roundAvatar
                // avatar={{uri: item.avatar}}
                // subtitle={item.display_name}
                // title={item.post_title}
                // containerStyle={{borderBottomWidth: 0}}
                // hideChevron={true}
                title={item.post_title}
                subtitle={item.display_name}
                leftAvatar={{ source: { uri: item.avatar }, rounded:true }}
            />
            <Text>
                {post.item.post_content}
            </Text>
        </Card>
    )
}

export default PostCard;