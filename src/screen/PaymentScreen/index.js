import * as React from 'react';
import {WebView} from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = () => {

    const route = useRoute();
    const url = route.params.url;

    return (
        <WebView
        source={{
          uri: url
        }}
        style={{ marginTop: 20 }}
      />
    );
}

export default PaymentScreen;