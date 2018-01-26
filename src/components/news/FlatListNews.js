import React from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Content, Icon } from 'native-base';

import PropTypes from 'prop-types';
import * as moment from 'moment';
import 'moment/locale/id';

export default class FlatListNews extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    fetchNews: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    listNews: PropTypes.array.isRequired,
  }

  state = {
    height: 0,
  };

  componentWillMount() {
    this.props.fetchNews();
  }

  transformDate = (value) => {
    const result = moment.unix(value).format('dddd, DD MMMM YYYY');
    return result;
  }

  renderListItem = (index, item) => (
    <TouchableWithoutFeedback
      onPress={() => this.props.navigator.push({
        screen: 'push.NewsDetail',
        animated: true,
        passProps: {
          image: item.image,
          content: item.content,
        },
      })}>
      <View style={styles.listItemContainer}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: item.image }}
            style={styles.image} />
        </View>
        <View style={{ flex: 2 }}>
          <Text
            numberOfLines={3}
            style={{ paddingTop: 10 }}>
            {item.title}
          </Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{this.transformDate(item.created_at)}</Text>
            <Text style={styles.readText}>
              <Icon
                name="ios-share-alt"
                style={styles.readIcon} /> read
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    const { height } = this.state;
    const { fetching, listNews } = this.props;

    return (
      <Content
        style={{ padding: 5 }}
        onLayout={e => this.setState({ height: e.nativeEvent.layout.height })}>
        {!fetching ?
          <FlatList
            data={listNews}
            renderItem={
              ({ index, item }) => this.renderListItem(index, item)
            }
            keyExtractor={item => item.id}
            extraData={this.props} /> :
          <View style={[styles.emptyContainer, { height }]}>
            <Image source={require('../../images/loading.gif')} />
          </View>
        }
      </Content>
    );
  }
}


const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 3,
  },
  dateContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  date: {
    fontSize: 11,
    flex: 1,
    color: '#e57373',
  },
  readText: {
    flex: 0,
    textAlign: 'right',
    color: '#f44336',
    paddingRight: 15,
  },
  readIcon: {
    fontSize: 16,
    color: '#f44336',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
