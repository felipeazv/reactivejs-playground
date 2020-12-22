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
                key: '96851e8e-493c-4165-8a1f-aabd6de5f02b'
            })
        })
            .then((response) => response.json())
            .then((response) => {
                window.$token = response.access_token;
                window.$isAuthenticated = true;
                console.log("Keycloak token retrieved.")
            })
            .catch(err => {
                alert("err" + err)
            })
    }
}