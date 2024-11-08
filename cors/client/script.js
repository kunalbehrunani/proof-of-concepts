fetch("http://localhost:3000/data")
.then( res => res.json() )
.then( data => console.log(`Client Fetch Request, Response received: ${data}`));