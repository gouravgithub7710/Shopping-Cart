const getUserFromServer = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
            credentials: 'include'
        }).catch(() => null) 

        if (!res) {
            return null
        }

       
        if (res.status === 401) {
            return null
        }

        
        if (!res.ok) {
            return null
        }
        
        const data = await res.json()
        return data
        
    } catch (error) {
       
        return null
    }
}

export default getUserFromServer