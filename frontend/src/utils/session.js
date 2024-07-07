const getSessionStarted = async () => {
    
      await  fetch("http://localhost:3000/chat/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
};

module.exports =  getSessionStarted ;