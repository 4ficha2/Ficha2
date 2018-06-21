export class Login {
    login:          string;
    pwd:            string;
    pwdCipher:      string;
    token:          string;
}

export interface User {
    userID:         number;             //0
    userName:       string;             //angel
    pin:            string;             //1234
    token:          number;             //9990
    eventList:      [{
        eventName:  string;             //"Ionic Course", 
        checkIn:    boolean;            //false, 
        message:    string;             //"Bienvenido"
        }];           
    welcome:        string;             //"Mensaje del profesor para Angel",
    history:        [{
        date:       string,
        eventName:  string,
        status:     string,
        comments:   string,     
        }];
}

export class Historico {
    date:           string;
    eventName:      string;
    status:         string;
    comments:       string;
}
