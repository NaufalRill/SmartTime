import { Redirect } from "expo-router";

import registerNNPushToken from 'native-notify';

export default function Index() {
  registerNNPushToken(33100, 'X5ZtQrSbAfozDexPPqKkwX');
  return <Redirect href="/auth/login" />;
}
