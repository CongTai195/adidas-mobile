export async function login (userName, password){
    const response = await fetch('http://10.0.2.2:8000/api/login',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: userName, password: password})
        });
    return await response.json();
  }