import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome, MaterialIcons, Octicons, Entypo, Feather, Ionicons  } from '@expo/vector-icons';
import { isToday } from 'date-fns';
import { getTime } from './DateContext';
import getIcon from './Icons';

export default function ToDoListItem(props) {
    const [expanded, setExpanded] = useState(false);

    const task = props.task;

    const styles = props.styles;



    let expandedContent;

    if (expanded) {
        expandedContent = (
            <View style={[styles.alignedRow, styles.spaceBetween, styles.marginVertical3, styles.width300]}>
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}>
                    <FontAwesome5 name="expand" size={16} color="black"/>
                    <Text style={styles.paddingTop2}>Details</Text>
                </Pressable>
                
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}>
                    <Feather name="edit" size={16} color="black" />
                    <Text style={styles.paddingTop2}>Edit</Text>
                </Pressable>
                
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}>
                    <AntDesign name="arrowright" size={16} color="black" />
                    <Text style={styles.paddingTop2}>Defer</Text>
                </Pressable>
            </View>
        )
    }

    return (
    <View style={[styles.row, styles.marginVertical3, styles.whiteBackground, styles.horizontalBorders]}>
        <View style={[styles.padding5]}><View style={styles.checkBox}></View></View>
        <Pressable style={[styles.marginVertical3, styles.paddingRight3, styles.paddingLeft4, styles.flex100, styles.leftBorder]}
        onPress={() => {
            setExpanded(!expanded);
        }}>
            <View style={styles.alignedRow}>
                <View style={styles.paddingRight4}>
                    {getIcon(task.iconLibrary,task.iconName,20,'black')}
                </View>
                <Text style={[styles.listItem, styles.fontSize2, styles.bold]}>{task.title}</Text>
            </View>
            {task.description && <Text style={[styles.fontSize00, styles.lightText]} numberOfLines={expanded ? 4 : 1}>{task.description}</Text>}
            <View style={[styles.alignedRow, styles.marginTop3]}>
                <View style={[styles.marginRight4, styles.alignedRow]}>
                    <Octicons name="note" size={12} color="#aaa"/>
                    <Text style={styles.fontSize00}> 3</Text>
                </View>
                {task.prority === 2 && <View style={[styles.marginRight4, styles.alignedRow, styles.orangeBackground]}>
                    <FontAwesome5 name="exclamation-circle" size={12} color="#aaa" style={styles.paddingRight2}/>
                    <Text style={styles.fontSize000}>HIGH PRIORITY</Text>
                </View>}
                {isToday(task.dueDate) && task.type === 'SCHEDULED' && <View style={[styles.marginRight4, styles.alignedRow, styles.yellowBackground]}>
                    <Octicons name="clock" size={12} color="#aaa"  style={styles.paddingRight2} />
                    <Text style={styles.fontSize000}>{getTime(task.dueDate)}</Text>
                </View>}
                {isToday(task.dueDate) && task.type === 'DEADLINE' && <View style={[styles.marginRight4, styles.alignedRow, styles.yellowBackground]}>
                    <Feather name="calendar" size={12} color="#aaa"  style={styles.paddingRight2} />
                    <Text style={styles.fontSize000}>DUE TODAY</Text>
                </View>}
            </View>
            {expanded && expandedContent}
        </Pressable>
    </View> )
}