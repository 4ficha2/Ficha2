export class Historico {
    date: string;
    eventID: string;
    eventName: string;
    status: string;
    comments: string;
    userName: string;
    

    constructor (date:string , eventID: string, eventName: string,
                 status: string, comments: string, userName: string)
    {
        this.date = date;
        this.eventID= eventID;
        this.eventName = eventName;
        this.status = status;
        this.comments = comments;
        this.userName = userName;
    }
}