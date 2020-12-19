window.$token = ""
window.$isAuthenticated = false

export function retrieveToken() {
    if (!window.$isAuthenticated) {
        fetch('/api/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 'task-client',
                key: 'ef3f048c-70a8-4db5-807b-cfdab41d9a7d'
            })
        })
            .then((response) => response.json())
            .then((response) => {
                window.$token = response.token;
                window.$isAuthenticated = true;
            })
            .then(() =>
                console.log("Keycloak token retrieved.")
            )
            .catch(err => {
                alert("err" + err)
            })
    }
}