import React, { useState, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import StyledText from '../components/StyledText';

import { styles } from '../styles/styles';
import getIcon from '../tools/icon';
import ToDoList from './todo';
import AllTasklist from './tasklist';
import DataInspector from '../DataInspector';
import IconPicker from '../iconPicker';
import { useSelector } from 'react-redux';
import { setRamProperty } from '../data/data-manager';

export default function AppNavigation() {
	let test = test;

	const navigationTab = useSelector(state => state.ram.navigationTab);
	const [expanded, setExpanded] = useState(false);

	const navigation = useNavigation();

	const openTaskEditor = () => {
		navigation.navigate('Editor', { action: 'new', mode: 'task' });
	};

	const Unimplemented = () => {
		return (
			<View style={{ width: '100%', height: '100%', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
				<Text style={{ marginBottom: 100, color: '#ddaaaa' }}>This feature is not yet implemented.</Text>
			</View>
		);
	};

	useEffect(() => {
		if (!navigationTab) setRamProperty('navigationTab', 0);
	}, []);

	const navOptions = [
		{
			index: 0,
			title: `To-Do`,
			iconFamily: 'MaterialCommunityIcons',
			iconName: 'clipboard-check-outline',
			component: <ToDoList key={0}></ToDoList>,
		},
		{
			index: 1,
			title: `Tasks`,
			iconFamily: 'FontAwesome',
			iconName: 'list-ul',
			component: <AllTasklist key={1}></AllTasklist>,
		},
		{
			index: 1,
			title: `New`,
			iconFamily: 'Ionicons',
			iconName: 'ios-add-circle',
			bigIcon: true,
			onPress: openTaskEditor,
		},
		{
			index: 3,
			title: `Planner`,
			iconFamily: 'FontAwesome5',
			iconName: 'calendar-alt',
			component: <Unimplemented key={3}></Unimplemented>,
		},
		{
			index: 4,
			title: `Settings`,
			iconFamily: 'Ionicons',
			iconName: 'md-settings',
			component: <Unimplemented key={4}></Unimplemented>,
		},
	];

	const handleNavPress = index => {
		if (index != navigationTab) setSelectedItem(index);
	};

	const navigationWidget = navOptions.map((navOption, index) => {
		return (
			<Pressable
				key={index}
				onPress={() =>
					navOption.onPress ? navOption.onPress() : setRamProperty('navigationTab', navOption.index)
				}
				style={navigationTab == navOption.index ? styles.navOptionActive : styles.navOptionInactive}>
				{getIcon(
					navOption.iconFamily,
					navOption.iconName,
					navOption.bigIcon ? 48 : 24,
					navigationTab == navOption.index ? styles.gray3 : styles.gray3
				)}
				{!navOption.bigIcon && (
					<StyledText
						style={
							navigationTab == navOption.index ? styles.navOptionTextActive : styles.navOptionTextInactive
						}>
						{navOption.title}
					</StyledText>
				)}
			</Pressable>
		);
	});

	return (
		<View style={styles.container}>
			<View style={styles.navWidget}>{navigationWidget}</View>
			<View style={styles.navContent}>{navOptions[navigationTab || 0].component}</View>
		</View>
	);
}
