export class Login {
    login:          string;
    pwd:            string;
    pwdCipher:      string;
    token:          string;
    avatar:         string;
}

export interface User {
    userID:         number;             //0
    userName:       string;             //angel
    avatar:         string;             //"https://avatars1.githubusercontent.com/u/36812721?s=400&u=2ac95ea573c0d31e8dc1fa5f6c2ac6808cc80b3e&v=4"
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
