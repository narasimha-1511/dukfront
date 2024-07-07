const getResponse = async ( message ) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const res = await fetch("https://dukfront.onrender.com/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    const r = await res.json();
    console.log("response in the fetch compel", r);
      return r;
};


export default getResponse;

