import { Alert } from 'react-native';

class AlertMessages
{
    simpleAlert(title, message, onPress)
    {
        return this.customAlert(title, message, [
            { text: "Ok", onPress: () => {onPress} }
        ], { cancelable: false });
    }

    customAlert(title, message, buttons, cancelable)
    {
        return Alert.alert(title, message, buttons, { cancelable: cancelable });
    }
}

export default AlertMessages;
