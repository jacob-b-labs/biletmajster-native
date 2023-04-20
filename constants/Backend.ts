import Constants from 'expo-constants';
// @ts-ignore: @env is created at runtime
import { REACT_NATIVE_API } from '@env'; // Important: Keep this import in line 3

export const CONSTANTS_BACKEND_LOCAL_MOCK = 'http://10.0.2.2:8000'
export const CONSTANTS_BACKEND_LOCALHOST = 'http://10.0.2.2:5079'
export const CONSTANTS_BACKEND_CLOUD = 'https://xxx.azurewebsites.net';
export const CONSTANTS_BACKEND_DIONIZOS = 'https://dionizos-backend-app.azurewebsites.net/';

export const BACKEND_URL =
  REACT_NATIVE_API ??
  Constants.expoConfig?.extra?.api ??
	CONSTANTS_BACKEND_LOCALHOST;

const Backend = (path: string) => BACKEND_URL + path;

export default Backend;