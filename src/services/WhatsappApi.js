import { Linking } from 'react-native';

class WhatsappApi
{
    constructor(whatsappApi)
    {
        this.whatsappApi = 'https://api.whatsapp.com/send?phone=';
    }

    async startChat(countryCode, phoneNumber)
    {
        const startChatUrl = this.whatsappApi + countryCode + phoneNumber;

        await Linking.openURL(startChatUrl);
    }
}

export default WhatsappApi;
