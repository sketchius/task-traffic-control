import AsyncStorage from '@react-native-async-storage/async-storage';
import { processAppData, processTaskData } from './data-preprocessor';

export async function saveTasksToLocal(tasks) {
	if (tasks) {
		try {
			tasks.forEach(task => {
				saveTaskToLocal(task);
			});
		} catch (e) {
			console.log(`   Error while saving tasks: ${e}`);
			// Handle Error
		}
	}
}

export async function saveTaskToLocal(task) {
	const json = JSON.stringify(task);
	await AsyncStorage.setItem(`@tasks/${task.uniqid}`, json);
	//console.log(`AsyncStorage: setting key '@tasks/${task.uniqid}' to ${json}`);
}

export async function recycleTaskAtLocal(task) {
	const json = JSON.stringify(task);
	await AsyncStorage.setItem(`@recycledTasks/${task.uniqid}`, json);
	await AsyncStorage.removeItem(`@tasks/${task.uniqid}`);
}

export async function completeTaskAtLocal(task) {
	const json = JSON.stringify(task);
	await AsyncStorage.setItem(`@completedTasks/${task.uniqid}`, json);
	await AsyncStorage.removeItem(`@tasks/${task.uniqid}`);
}

export async function printKeys() {
	let keys = await AsyncStorage.getAllKeys();
	console.log(`keys = ${JSON.stringify(keys)}`);
}

export async function saveStatusToLocal(status) {
	try {
		await AsyncStorage.setItem('@status', status);
	} catch (e) {
		console.log(`   Error while saving status: ${e}`);
		// Handle Error
	}
}

export async function saveLastUpdateDate(date) {
	if (typeof date != 'string') date = date.toISOString();
	console.log(`Saving ${date} to local storgae at key: @lastUpdateDate`);
	try {
		await AsyncStorage.setItem('@lastUpdateDate', date);
	} catch (e) {
		console.log(`   Error while saving status: ${e}`);
		// Handle Error
	}
}

export async function loadTasks() {
	try {
		const keys = await AsyncStorage.getAllKeys();
		const taskKeys = keys.filter(key => key.includes('tasks/'));
		const taskData = await AsyncStorage.multiGet(taskKeys);
		const tasks = taskData.map(entry => {
			return processTaskData(JSON.parse(entry[1]));
		});
		return tasks;
	} catch (e) {
		alert(`failed to read tasks: ${e}`);
	}
}

export async function removeAllTasks() {
	try {
		const keys = await AsyncStorage.getAllKeys();
		const taskKeys = keys.filter(key => key.includes('tasks/'));
		const taskData = await AsyncStorage.multiGet(taskKeys);
		taskData.forEach(async entry => {
			await AsyncStorage.removeItem(entry[0]);
		});
	} catch (e) {
		alert(`failed to read tasks: ${e}`);
	}
}

export async function saveData(key, data) {
	try {
		await AsyncStorage.setItem('@' + key, data);
	} catch (e) {
		// Handle Error
	}
}

export async function loadData(key) {
	try {
		return await AsyncStorage.getItem('@' + key);
	} catch (e) {
		// error reading value
	}
}

export async function loadAppData() {
	try {
		const keys = await AsyncStorage.getAllKeys();

		console.log(`ALL KEYS = `);
		console.log(JSON.stringify(keys, null, 4));
		console.log(`##########################`);
		const appKeys = keys.filter(key => key.includes('app/'));

		console.log(`APP KEYS = `);
		console.log(JSON.stringify(appKeys, null, 4));
		console.log(`##########################`);
		const appDataArray = await AsyncStorage.multiGet(appKeys);
		console.log(`appDataArray = `);
		console.log(JSON.stringify(appDataArray, null, 4));
		console.log(`##########################`);
		const appDataObject = {};
		appDataArray.forEach(entry => {
			appDataObject[entry[0].replace('@app/', '')] = entry[1];
		});
		console.log(`appDataArray afte replace = `);
		console.log(JSON.stringify(appDataObject, null, 4));
		console.log(`##########################`);
		return processAppData(appDataObject);
	} catch (e) {
		alert(`failed to read tasks: ${e}`);
	}
}

export async function saveAppProperty(property, data) {
	await AsyncStorage.setItem(`@app/${property}`, data);
}

export async function loadAppPropertyFromLocal(property) {
	return await AsyncStorage.getItem(`@app/${property}`);
}