/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Icon, ListItem, Text} from 'react-native-elements';
import {Project} from '../../entities/project';
import {commonStyles} from '../../styles';
import {CircleButtonProps} from '../../components/CircleButtons/CircleButton';
import {CircleButtonBlock} from '../../components/CircleButtons/CircleButtonBlock';
import {DataListItem} from '../../components/DataListItem';
import {DetailsViewComponentProps} from '../../core/types';
import moment from 'moment';
import {DataExtraFields} from "../../components/DataExtraFields";
import {useNavigation} from "@react-navigation/native";

export function ProjectDetailsView({
  data,
}: DetailsViewComponentProps<Project>): React.ReactElement {
  console.log('DATA', data);
  const navigation = useNavigation();
  const actions: Array<CircleButtonProps> = [
    {icon: 'add', title: 'New task'},
    {icon: 'done', title: 'Finish'},
  ];

  const connectedScreens: Array<React.ReactElement> = [];
  // if (app.entitiesMap['Project'] !== undefined) {
  connectedScreens.push(
      <TouchableOpacity
          onPress={() => navigation.navigate('ProjectTasks', {id: data.id})}>
        <ListItem bottomDivider>
          <Icon name={'ios-radio-button-off'} type={'ionicon'} />
          <ListItem.Content>
            <ListItem.Title>Tasks</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>,
  );
  // }

  const conntectedScreensRendered =
      connectedScreens.length > 0 ? (
          <View style={{marginTop: '15px'}}>{connectedScreens}</View>
      ) : (
          <View />
      );


  return (
    <SafeAreaView style={commonStyles.safeAreaContainer}>
      <View style={{alignItems: 'center', paddingTop: '20px', width: '100%'}}>
        <Text h2 style={{marginTop: '15px', paddingBottom: '15px'}}>
          {data.name}
        </Text>
        <CircleButtonBlock data={actions} />
      </View>
      {conntectedScreensRendered}
      <View style={{marginTop: '25px'}}>
        <DataListItem
            name={'Status'}
            value={data.status}
        />
        <DataListItem
          name={'Starting date'}
          value={moment(data.startDate * 1000).format('YYYY-MM-DD').toString()}
        />
        <DataListItem
          name={'Finishing date'}
          value={moment(data.finishDate * 1000).format('YYYY-MM-DD').toString()}
        />
        <DataExtraFields data={data} />
      </View>
    </SafeAreaView>
  );
}
