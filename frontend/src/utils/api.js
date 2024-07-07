const getResponse = async ( message ) => {

    const res = await fetch("https://dukfront.onrender.com/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        sessionId: localStorage.getItem("sessionId"),
      }),
    });
    const r = await res.json();
    console.log("response in the fetch compel", r);
      return r;
};


export default getResponse;

