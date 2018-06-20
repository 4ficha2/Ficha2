export class Login {
    login: string;
    pwd: string;
    pwdCipher: string;
    token: string;
}

export interface User {
    userID:     number;             //0
    userName:   string;             //angel
    pin:        string;             //1234
    token:      number;             //9990
    eventList:  [string];           //["00", "01", "10"]
    welcome:    string;             //"Mensaje del profesor para Angel",
    history:    [{
        date:       string,
        eventID:    string,
        status:     string,
        comments:   string,     
        }];
        //{"date":"11/06/2018", "eventID": "00", "status": "late", "comments": "Problemas de trafico"},
}
