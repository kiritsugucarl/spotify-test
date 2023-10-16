import { useState, useEffect } from "react";

const App = () => {
    const [accessToken, setAccessToken] = useState("");
    const [artistData, setArtistData] = useState(null); // State to store artist data

    useEffect(() => {
        // Define your client ID and client secret
        const clientId = "your-client-id";
        const clientSecret = "your-client-secret";

        // Fetch the access token
        fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: "40a56abcff114908b828db1e6919928c",
                client_secret: "b3f49c05f10d449ab5e54310d1123fa7",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Store the access token in state
                setAccessToken(data.access_token);

                console.log("Token: " + data);

                // Use the access token to fetch artist data
                fetch(
                    "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
                    {
                        headers: {
                            Authorization: `Bearer ${data.access_token}`,
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // Store the artist data in state
                        setArtistData(data);
                    })
                    .catch((error) => {
                        console.error("Error fetching artist data:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching access token:", error);
            });
    }, []); // The empty dependency array makes this code run once when the component mounts

    return (
        <div className="main">
            <h1>Spotify + React</h1>
            {accessToken && <p>Access Token: {accessToken}</p>}
            {artistData && (
                <div>
                    <h2>Artist Data</h2>
                    <pre>{JSON.stringify(artistData, null, 2)}</pre>
                </div>
            )}
            {/* You can now use the 'accessToken' and 'artistData' states for your application */}
        </div>
    );
};

export default App;
