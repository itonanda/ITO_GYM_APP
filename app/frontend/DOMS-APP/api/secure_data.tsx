const fetchSecureData = async () => {
//   const { data: { session } } = await supabase.auth.getSession();
  
  const response = await fetch('http://YOUR_BACKEND_IP:3000/api/secure-data', {
    headers: {
    //   'Authorization': `Bearer ${session.access_token}`,
    },
  });
  
  const result = await response.json();
  console.log(result);
};