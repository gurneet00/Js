const userNamesObj={};

module.exports.setUser = function setUserNames(socket,userName,nickName){
    userNamesObj[userName]={
        Data : {userName : userName ,
        nickName : nickName},
        connection : socket
    };
    //console.log(userNamesObj[userName])
    return userNamesObj[userName];
}

module.exports.getUser = function getUser(userName){
    return userNamesObj[userName]; 
}


