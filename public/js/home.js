const greeting = document.querySelector('.greeting');

window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/login'; // Redirect to login page if name is not in sessionStorage
    } else {
        // Display greeting and other session info
        greeting.innerHTML = `Hello ${sessionStorage.name} <br>
                              Email: ${sessionStorage.email}`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear(); // Clear all sessionStorage data
    location.reload(); // Reload the page after logout
}
