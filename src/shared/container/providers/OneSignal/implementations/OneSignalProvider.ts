import IOneSignalProvider from '../models/IOneSignalProvider';
import ISendNotificationDTO from '../dtos/ISendNotificationDTO';
import https from 'https';

class OneSignalProvider implements IOneSignalProvider {
    public sendNotification(dto: ISendNotificationDTO): void {
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${process.env.APP_KEY_ONESIGNAL}`
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        var request = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });

        request.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
        });

        var message = {
            app_id: process.env.APP_ID_ONESIGNAL,
            contents: { "en": dto.contents },
            headings: { "en": dto.headings },
            include_player_ids: dto.players_id
        };

        request.write(JSON.stringify(message));

        request.end();

        var message_ios = {
            app_id: process.env.APP_ID_ONESIGNAL_IOS,
            contents: { "en": dto.contents },
            headings: { "en": dto.headings },
            include_player_ids: dto.players_id
        };

        request.write(JSON.stringify(message_ios));

        request.end();
    }

    public sendNotificationIos(dto: ISendNotificationDTO): void {
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${process.env.APP_KEY_ONESIGNAL}`
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        var request = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });

        request.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
        });

        var message_ios = {
            app_id: process.env.APP_ID_ONESIGNAL_IOS,
            contents: { "en": dto.contents },
            headings: { "en": dto.headings },
            include_player_ids: dto.players_id
        };

        request.write(JSON.stringify(message_ios));

        request.end();
    }
}

export default OneSignalProvider;