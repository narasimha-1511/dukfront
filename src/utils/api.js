const getResponse = async ( message ) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const res  = await  fetch(backendUrl + "/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    })
      const r = await res.json();
      return r;
};


export default getResponse;

