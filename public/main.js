window.onload = function() {
	checkLocalNetwork();
}


async function checkLocalNetwork() {
	// Replace with a known IP or local hostname on your network
	const localGatewayOrServer = 'http://192.168.2.165'; 
  
	try {
		// Set a short timeout so the app doesn't hang if the network is missing
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), 2000); 

		await fetch(localGatewayOrServer, { 
			mode: 'no-cors', // Prevents CORS errors from blocking the network test
			signal: controller.signal 
		});
    
		clearTimeout(id);
			//window.location.href = "http://192.168.2.165";
		return true;
	} catch (error) {
		console.log("Device is NOT connected to the local network.");
		return false;
	}
}
