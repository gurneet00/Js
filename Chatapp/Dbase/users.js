const userNamesObj={};

module.exports.setUser = function setUserNames(socket,userName,Nickname){
    userNamesObj[userName]={
        Data : {userName : userName ,
        Nickname : Nickname},
        connection : socket
    };
    return userNamesObj[userName];
}

module.exports.getUser = function getUser(userName){
    return userNamesObj[userName]; 
}

